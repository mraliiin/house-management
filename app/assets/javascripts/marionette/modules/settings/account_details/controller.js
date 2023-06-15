HousePad.TradeApp.module("Settings.AccountDetails", function(AccountDetails, TradeApp, Backbone, Marionette, $, _){

    AccountDetails.Controller = {
        show: function(){

            this.Layout = new AccountDetails.AccountDetailsLayout();
            TradeApp.module("Settings").Controller.Layout.getRegion("container").show(this.Layout);

            HousePad.TradeApp.module("Settings.AccountDetails.AccountInfo").start();
            HousePad.TradeApp.module("Settings.AccountDetails.Avatar").start();

        }
    }
});
