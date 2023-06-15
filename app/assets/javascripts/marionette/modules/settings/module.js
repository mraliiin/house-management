HousePad.TradeApp.module("Settings", function(Settings, TradeApp, Backbone, Marionette, $, _){

    Settings.startWithParent = false;

    Settings.on("start", function() {
        Settings.Controller.show();
    });
});