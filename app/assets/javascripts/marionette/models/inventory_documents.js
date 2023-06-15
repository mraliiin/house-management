HousePad.TradeApp.module("Models", function(Models, TradeApp, Backbone, Marionette, $, _){

    Models.InventoryDocuments = Backbone.Collection.extend({
        model: Models.InventoryDocument
    });

});