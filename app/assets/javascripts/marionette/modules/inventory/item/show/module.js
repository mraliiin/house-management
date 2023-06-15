HousePad.TradeApp.module("Inventory.Item.Show", function(Show, TradeApp, Backbone, Marionette, $, _){

    Show.startWithParent = false;

    Show.on("start", function() {
        Show.Controller.show();
    });
});