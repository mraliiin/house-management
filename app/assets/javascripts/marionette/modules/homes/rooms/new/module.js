HousePad.TradeApp.module("Homes.Rooms.New", function(New, TradeApp, Backbone, Marionette, $, _){

    New.startWithParent = false;

    New.on("start", function() {
        TradeApp.addRegions({new_room: "#new-room-modal"});
        New.Controller.show();
    });
});