HousePad.TradeApp.module("Settings.Billing", function(Billing, TradeApp, Backbone, Marionette, $, _){

    Billing.Controller = {
        show: function(){

            this.Layout = new Billing.BillingLayout();
            TradeApp.module("Settings").Controller.Layout.getRegion("container").show(this.Layout);

            TradeApp.module("Settings.Billing.Info").start();
            TradeApp.module("Settings.Billing.Transactions").start();

        }
    }
});
