HousePad.TradeApp.module("Inventory.Index", function(Index, TradeApp, Backbone, Marionette, $, _){

    Index.startWithParent = false;

    Index.on("start", function() {
        Index.Controller.show();
    });

});