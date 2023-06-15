HousePad.TradeApp.module("Settings.Billing", function(Billing, TradeApp, Backbone, Marionette, $, _){

    Billing.startWithParent = false;

    Billing.on("start", function() {

        TradeApp.module("Settings.Menu").start("billing");
        Billing.Controller.show();
    });
});