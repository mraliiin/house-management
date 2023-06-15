HousePad.TradeApp.module("Rooms.Inventory", function(Inventory, TradeApp, Backbone, Marionette, $, _){

    Inventory.startWithParent = false;

    Inventory.on("start", function() {
        Inventory.Controller.show();
    });

    Backbone.Radio.comply("room", "reload", function(){
        Inventory.Controller.reloadRoom();
    });

});