HousePad.TradeApp.module("Inventory.Item.RequestInfo", function(RequestInfo, TradeApp, Backbone, Marionette, $, _){

    RequestInfo.Controller = {
        show: function(){
            if (RequestInfo.Controller.region) {
                RequestInfo.Controller.showPartial();
            } else {
                RequestInfo.Controller.showFull();
            }
        },

        showFull: function(){
            this.layout = new RequestInfo.RequestInfoLayout();
            TradeApp.Layout.getRegion("main_panel").show(this.layout);

            // Form content
            this.inventory_item = Backbone.Radio.request("app:data", "inventory_item");
            this.requestInfoView = new RequestInfo.RequestInfoView({ collection: this.inventory_item } );
            this.layout.getRegion("inventory_request_info").show(this.requestInfoView);

            // Breadcrumbs data
            this.ddr_breadcrumb_data = this.inventory_item.get("ddr_breadcrumb_data");
            this.breadcrumbsView = new RequestInfo.BreadcrumbsView({ collection: this.ddr_breadcrumb_data });
            this.layout.getRegion("ddr_breadcrumbs").show(this.breadcrumbsView);

            RequestInfo.Controller._bindFormEvents();

            $('#page-overlay').hide();
        },

        // For clients page (2nd tab)
        showPartial: function(){
            // Form content
            this.inventory_item = Backbone.Radio.request("app:data", "inventory_item");
            this.requestInfoView = new RequestInfo.RequestInfoView({ collection: this.inventory_item } );

            RequestInfo.Controller._bindFormEvents();

            RequestInfo.Controller.region.show(this.requestInfoView);
        },

        changeHouseSelection : function(house_id){
            RequestInfo.Controller.requestInfoView.showProgress();

            // Get newly selected house
            var inventory_item = RequestInfo.Controller.inventory_item;
            var ddr = inventory_item.get('house_list_data');

            var client = ddr.get('selected_client');

            if (client == undefined) {
                RequestInfo.Controller.requestInfoView.hideProgress();
                return;
            }

            var projects = client['other_houses'];
            var selected_project = projects.filter(function(h){
                return house_id == h['id'];
            })[0];

            // Update view collection to load the house rooms in the second list
            if(selected_project != undefined) {
                client['selected_house'] = selected_project;
                ddr.set('selected_client', client);
                inventory_item.set('house_list_data', ddr);

                Backbone.Radio.command("app:data", "set_inventory_item", inventory_item);
                RequestInfo.Controller.show();
            }

            RequestInfo.Controller.requestInfoView.hideProgress();
        },

        changeClientSelection: function(client_id){
            RequestInfo.Controller.requestInfoView.showProgress();

            // Get newly selected client
            var inventory_item = RequestInfo.Controller.inventory_item;
            var ddr = inventory_item.get('house_list_data');

            var clients = ddr.get('other_clients');
            var selected_client = clients.filter(function(c){
                return client_id == c['id'];
            })[0];

            // Update view collection to load the house rooms in the second list
            if(selected_client != undefined) {
                ddr.set('selected_client', selected_client);
                inventory_item.set('house_list_data', ddr);
                Backbone.Radio.command("app:data", "set_inventory_item", inventory_item);
                RequestInfo.Controller.show();
            }

            RequestInfo.Controller.requestInfoView.hideProgress();
        },

        validateInputs : function() {
            var response = {isValid : true};
            var client_id = $('#client_selector').val();
            if(client_id == '' || client_id == null) {
                return  { message: 'Client is required!', isValid: false};
            }

            var title = $('#request-info-title').val();
            if(title == '' || title == null) {
                return { message: 'Title is required!', isValid: false};
            }

            var email = $('#request-info-email').val();
            if(email == '' || email == null) {
                return { message: 'Email is required!', isValid: false};
            }
            return response;
        },

        redirectToList: function(){
            var params = [];
            if( $('#project_selector').val() ) {
                params.push('project=' + $('#project_selector').val())
            }

            if( $('#room_id').val() ) {
                params.push('room=' + $('#room_id').val())
            }
            var redirect_to = (params.length > 0)
                ? "/trade/inventory?" + params.join('&')
                : "/trade/inventory";

            window.location.href = redirect_to;
        },

        _bindFormEvents: function() {
            // Refresh rooms list on project_changed event
            RequestInfo.Controller.requestInfoView.on("new-ddr:project_changed", function(){
                var data = Backbone.Syphon.serialize(this);
                RequestInfo.Controller.changeHouseSelection(data['house_id']);
            });

            RequestInfo.Controller.requestInfoView.on("new-ddr:client_changed", function(){
                var data = Backbone.Syphon.serialize(this);
                RequestInfo.Controller.changeClientSelection(data['client_id']);
            });

            RequestInfo.Controller.requestInfoView.on("inventory-item:request-info", function(){
                RequestInfo.Controller.requestInfoView.showProgress();
                RequestInfo.Controller.requestInfoView.hideItemFeedback();


                var validation = RequestInfo.Controller.validateInputs();
                if (!validation.isValid) {
                    RequestInfo.Controller.requestInfoView.hideProgress();
                    RequestInfo.Controller.requestInfoView.showFailedSaveMessage(validation.message);
                    return;
                }

                var data = Backbone.Syphon.serialize(this);
                data['request_sections'] = RequestInfo.Controller.getSelectedItemSections();

                var save_promise = $.post("/trade/inventory-items/request-info", data);
                if (save_promise) {
                    $.when(save_promise).done(function(){
                        RequestInfo.Controller.requestInfoView.hideProgress();
                        RequestInfo.Controller.requestInfoView.showSuccessfulSaveMessage();
                        RequestInfo.Controller.redirectToList();
                    });
                    $.when(save_promise).fail(function () {
                        RequestInfo.Controller.requestInfoView.hideProgress();
                        RequestInfo.Controller.requestInfoView.showFailedSaveMessage();
                    });
                } else {
                    RequestInfo.Controller.requestInfoView.hideProgress();
                    RequestInfo.Controller.requestInfoView.showFailedSaveMessage();
                }
            });

            RequestInfo.Controller.requestInfoView.on("inventory-item:cancel-request-info", function(){
            });
        },

        getSelectedItemSections : function(){
            var request_sections = [];
            $("input:checkbox[name='request_section']:checked").each(function() {
                request_sections.push($(this).attr('id'));
            });

            return request_sections;
        },
    }
});
