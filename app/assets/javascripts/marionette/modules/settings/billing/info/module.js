HousePad.TradeApp.module("Settings.Billing.Info", function(Info, TradeApp, Backbone, Marionette, $, _){

    Info.startWithParent = false;

    Info.on("start", function() {
        Info.Controller.show();
    });
});