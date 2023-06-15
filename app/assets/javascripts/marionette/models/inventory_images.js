HousePad.TradeApp.module("Models", function(Models, TradeApp, Backbone, Marionette, $, _){

    Models.InventoryImages = Backbone.Collection.extend({
        model: Models.InventoryImage
    });

});