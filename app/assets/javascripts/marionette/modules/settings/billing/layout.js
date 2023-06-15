HousePad.TradeApp.module("Settings.Billing", function(Billing, TradeApp, Backbone, Marionette, $, _){

    Billing.BillingLayout = Backbone.Marionette.LayoutView.extend({
        template: "#billing-template",
        tagName: "div",
        className: "row",

        regions: {
            billing_info: "#billing-info-container",
            transactions: "#billing-transactions-container"
        }
    });
});