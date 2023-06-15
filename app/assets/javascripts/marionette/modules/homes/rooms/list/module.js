HousePad.TradeApp.module("Homes.Rooms.List", function(List, TradeApp, Backbone, Marionette, $, _){

    List.startWithParent = false;

    List.on("start", function(options) {
        List.Controller.region = options["region"];
        List.Controller.show();
    });

    Backbone.Radio.comply("rooms", "reload", function(){
        List.Controller.reloadRooms();
    });

    Backbone.Radio.comply("rooms", "rooms:add-room", function(){
        List.Controller.loadNewRoomDialog();
    });
});