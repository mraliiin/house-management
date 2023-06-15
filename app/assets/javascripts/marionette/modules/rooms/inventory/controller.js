HousePad.TradeApp.module("Rooms.Inventory", function(Inventory, TradeApp, Backbone, Marionette, $, _){

    Inventory.Controller = {

        show: function(){
            this.layout = new Inventory.InventoryLayout();
            TradeApp.Layout.getRegion("main_panel").show(this.layout);

            //this.room = Backbone.Radio.request("app:data", "room");
            //this.inventoryView = new Inventory.InventoryView({model: this.room});

            //this.layout.getRegion("room_inventory").show(this.inventoryView);

            //(re)Start Room title module
            TradeApp.module("Rooms.Header").stop();
            TradeApp.module("Rooms.Header").start({region: this.layout.getRegion("room_header")});

            //(re)Start Inventory Filters module
            TradeApp.module("Inventory.Filters").stop();
            TradeApp.module("Inventory.Filters").start({region: this.layout.getRegion("room_inventory_filters")});

            //(re)Start Inventory items module
            TradeApp.module("Inventory.Items").stop();
            TradeApp.module("Inventory.Items").start({region: this.layout.getRegion("room_inventory_items")});

            // Breadcrumbs data
            this.room = Backbone.Radio.request("app:data", "room");
            this.clients_with_house_data = this.room.get("clients_with_house_data");
            this.breadcrumbsView = new Inventory.BreadcrumbsView({ collection: this.clients_with_house_data });
            this.layout.getRegion("rooms_breadcrumbs").show(this.breadcrumbsView);
        },

        reloadRoom: function(){
            var room = Backbone.Radio.request("app:data", "room");
            var fetch_promise = room.fetch();

            if (fetch_promise) {
                $.when(fetch_promise).done(function(){
                    Backbone.Radio.command("app:data", "set_room", room);
                    Inventory.Controller.show();
                });
            }
        }

    }
});
