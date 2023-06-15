HousePad.TradeApp.module("Inventory.Filters", function(Filters, TradeApp, Backbone, Marionette, $, _){

    Filters.startWithParent = false;

    Filters.on("start", function(options) {
        Filters.Controller.region = options["region"];
        Filters.Controller.show();
    });
});