HousePad.TradeApp.module("Models", function(Models, TradeApp, Backbone, Marionette, $, _){

    Models.InventoryItems = Backbone.Collection.extend({
        model: Models.InventoryItem
    });

});