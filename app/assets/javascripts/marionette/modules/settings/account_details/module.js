HousePad.TradeApp.module("Settings.AccountDetails", function(AccountDetails, TradeApp, Backbone, Marionette, $, _){

    AccountDetails.startWithParent = false;

    AccountDetails.on("start", function() {

        TradeApp.module("Settings.Menu").start("account-details");
        AccountDetails.Controller.show();
    });
});