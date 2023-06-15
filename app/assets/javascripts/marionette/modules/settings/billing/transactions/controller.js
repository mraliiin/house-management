HousePad.TradeApp.module("Settings.Billing.Transactions", function(Transactions, TradeApp, Backbone, Marionette, $, _) {

    Transactions.Controller = {
        show: function () {

            this.current_user = Backbone.Radio.request("app:data", "current_user");

            this.transactionsView = new Transactions.TransactionsView({model: this.current_user});

            //Render transactions view
            TradeApp.module("Settings.Billing").Controller.Layout.getRegion("transactions").show(this.transactionsView);
        }
    }
});



