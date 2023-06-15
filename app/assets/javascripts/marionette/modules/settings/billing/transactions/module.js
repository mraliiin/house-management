HousePad.TradeApp.module("Settings.Billing.Transactions", function(Transactions, TradeApp, Backbone, Marionette, $, _){

    Transactions.startWithParent = false;

    Transactions.on("start", function() {
        Transactions.Controller.show();
    });
});