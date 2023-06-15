HousePad.TradeApp.module("Clients.Homes.NewHome", function(NewHome, TradeApp, Backbone, Marionette, $, _){

    NewHome.startWithParent = false;

    NewHome.on("start", function() {
        NewHome.Controller.show();
    });
});