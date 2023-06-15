HousePad.TradeApp.module("Inventory.Items", function(Items, TradeApp, Backbone, Marionette, $, _){

    Items.startWithParent = false;

    Items.on("start", function(options) {
        Items.Controller.region = options["region"];
        Items.Controller.show();
    });
});