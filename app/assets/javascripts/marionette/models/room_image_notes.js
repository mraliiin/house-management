HousePad.TradeApp.module("Models", function(Models, TradeApp, Backbone, Marionette, $, _){

    Models.RoomImageNotes = Backbone.Collection.extend({
        model: Models.RoomImageNote
    });
});