HousePad.TradeApp.module("Clients.Homes.NewHome", function(NewHome, TradeApp, Backbone, Marionette, $, _){

    NewHome.Controller = {

        show: function(){
            this.trade_clients = Backbone.Radio.request("app:data", "trade_clients");
            this.newHomeView = new NewHome.NewHomeView({ collection : this.trade_clients});

            this.newHomeView.on("new-home:save", function() {
                NewHome.Controller.newHomeView.showProgress();
                var home_data = Backbone.Syphon.serialize(this);
                NewHome.Controller.saveNewProject(home_data, "homes");
            });

            this.newHomeView.on("new-clients-home:save", function() {
                NewHome.Controller.newHomeView.showProgress();
                var home_data = Backbone.Syphon.serialize(this);
                NewHome.Controller.saveNewProject(home_data, "clients");
            });

            TradeApp.clients_modal.show(this.newHomeView);
        },

        saveNewProject : function(home_data, page) {
            // If client_id comes from the post-data
            var client_id = home_data['client_id'];

            // Otherwise use the old method
            if (client_id == undefined || client_id == null) {
                var trade_client = Backbone.Radio.request("app:data", "trade_client");
                client_id = trade_client.get("trade_client").id;
            }

            // Validation
            if(client_id === undefined || client_id === ''
                || home_data['name'] === '' ||  home_data['name'] === undefined)
            {
                NewHome.Controller.newHomeView.hideProgress();
                NewHome.Controller.newHomeView.showFailedSaveMessage(home_data);
                return;
            }

            var save_promise = $.post("/trade/clients/" + client_id + "/create_house", { house: home_data });
            if (save_promise) {
                $.when(save_promise).done(NewHome.Controller.completeSaveNewHome(page));
                $.when(save_promise).fail(function (home_data) {
                    NewHome.Controller.newHomeView.hideProgress();
                    NewHome.Controller.newHomeView.showFailedSaveMessage(home_data);
                });
            } else {
                NewHome.Controller.newHomeView.hideProgress();
                this.showInvalidFormMessage();
            }
        },

        completeSaveNewHome: function(page){
            NewHome.Controller.newHomeView.showSuccessfulSaveMessage();
            Backbone.Radio.command(page, "reload");
            TradeApp.module("Clients.Homes.NewHome").stop();

            $('#clients-modal').modal("hide");
            $("#page-overlay").show();
        }
    }
});
