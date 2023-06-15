HousePad.TradeApp.module("Inventory.Filters", function(Filters, TradeApp, Backbone, Marionette, $, _){

    Filters.Controller = {

        show: function(){

            if (Filters.Controller.region) {

                this.room = Backbone.Radio.request("app:data", "room");

                this.filtersView = new Filters.FiltersView({model: this.room});

                Filters.Controller.region.show(this.filtersView);

                this.filtersView.on("item:new", function () {
                    HousePad.TradeApp.module("Inventory.Item.Edit").start();
                });
            }
        }
    }
});
