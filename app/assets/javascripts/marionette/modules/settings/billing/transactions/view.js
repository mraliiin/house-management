HousePad.TradeApp.module("Settings.Billing.Transactions", function(Transactions, TradeApp, Backbone, Marionette, $, _){

    Transactions.TransactionsView = Marionette.ItemView.extend({
        template: "#billing-transactions-template",
        tagName: "div",
        className: "row",

        ui: {
        },

        triggers: {
        }

    });
});