HousePad.TradeApp.module("Settings.Menu", function(Menu, TradeApp, Backbone, Marionette, $, _){

    Menu.startWithParent = false;

    Menu.on("start", function(mode) {

        Menu.Controller.show(mode);
    });
});