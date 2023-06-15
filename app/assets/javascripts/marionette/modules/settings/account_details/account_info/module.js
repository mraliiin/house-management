HousePad.TradeApp.module("Settings.AccountDetails.AccountInfo", function(AccountInfo, TradeApp, Backbone, Marionette, $, _){

    AccountInfo.startWithParent = false;

    AccountInfo.on("start", function() {
        AccountInfo.Controller.show();
    });
});