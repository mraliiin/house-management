HousePad.TradeApp.module("Inventory.Index.Filters", function(Filters, TradeApp, Backbone, Marionette, $, _){

    Filters.Controller = {

        show: function(){

            if (Filters.Controller.region) {

                this.filters = Backbone.Radio.request("app:data", "filters");

                this.filtersView = new Filters.FiltersView({collection: this.filters});

                // New filtering
                Backbone.Radio.comply("inventory-filters", "status-changed", function(status){
                    // Update filters (maybe in the future we'll have multiple filters)
                    var filters = Backbone.Radio.request("app:data", "filters");
                    filters.set('selected_status', status);

                    // Reset page
                    filters.set('page', 1);

                    Backbone.Radio.command("inventory-items", "set_filters", filters);

                    // Reload items
                    Backbone.Radio.command("inventory-items", "refine-search");
                });

                // Doc type changed (care, invoice...)
                Backbone.Radio.comply("inventory-filters", "doc-type-changed", function(doc_type){
                    var filters = Backbone.Radio.request("app:data", "filters");
                    filters.set('doc_type', doc_type);

                    // Reset page
                    filters.set('page', 1);

                    Backbone.Radio.command("inventory-items", "set_filters", filters);

                    // Reload items
                    Backbone.Radio.command("inventory-items", "refine-search");
                });

                // Paging
                Backbone.Radio.comply("inventory-filters", "page-changed", function(step){
                    var filters = Backbone.Radio.request("app:data", "filters");
                    var page = filters.get('page') || 1;
                    page = step > 0 ? page + step : (page > 1 ? page + step : 1);

                    filters.set('page', page);
                    Backbone.Radio.command("inventory-items", "set_filters", filters);

                    // Reload items
                    Backbone.Radio.command("inventory-items", "refine-search");
                });

                // Load new item module
                this.filtersView.on("item:new", function () {
                    var filters = Filters.Controller.filters;

                    var Models = HousePad.TradeApp.module("Models");
                    var inventory_item = new Models.InventoryItem({
                        house_id: parseInt(filters.get('current').house_id),
                        room_id: parseInt(filters.get('current').room_id)
                    });

                    Backbone.Radio.command("app:data", "set_inventory_item", inventory_item);

                    TradeApp.module("Inventory.Item.Edit").start();
                });

                this.filtersView.on("drr:new", function(){
                    var filters = Filters.Controller.filters;

                    var redirect_to = "/trade/inventory-items/request-info";
                    var has_params = false;

                    var house_id = parseInt(filters.get('current').house_id);
                    if (house_id > 0) {
                        redirect_to += (has_params ? "&" : "?") + "project="+house_id;
                        has_params = true;
                    }

                    var room_id = parseInt(filters.get('current').room_id);
                    if (room_id > 0) {
                        redirect_to += (has_params ? "&" : "?") + "room="+room_id;
                        has_params = true;
                    }

                    window.location.href=redirect_to;
                });

                Filters.Controller.region.show(this.filtersView);
            }
        },

        reloadRooms: function(house_id) {
            var load_promise = $.get("/trade/homes/"+house_id+"/rooms");
            if (load_promise) {
                $.when(load_promise).done(function(rooms){
                    Filters.Controller.filters.set("rooms", rooms);
                    Filters.Controller.show();
                });
                $.when(load_promise).fail(function () {
                    Filters.Controller.filters.set("rooms", new Array());
                    Filters.Controller.show();
                });
            } else {
                Filters.Controller.filters.set("rooms", new Array());
                Filters.Controller.show();
            }
        }
    }
});
