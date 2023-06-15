HousePad.TradeApp.module("Inventory.Items", function(Items, TradeApp, Backbone, Marionette, $, _){

    Items.Controller = {

        show: function(){

            if (Items.Controller.region) {

                this.room = Backbone.Radio.request("app:data", "room");

                this.itemsView = new Items.ItemsView({collection: this.room.get("inventory_items")});

                Items.Controller.region.show(this.itemsView);
            }
        }
    }
});
