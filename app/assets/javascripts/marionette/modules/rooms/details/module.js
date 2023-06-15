HousePad.TradeApp.module("Rooms.Details", function(Details, TradeApp, Backbone, Marionette, $, _){

    Details.startWithParent = false;

    Details.on("start", function() {
        Details.Controller.show();
    });

    Backbone.Radio.comply("room", "reload", function(){
        Details.Controller.reloadRoom();
    });

});