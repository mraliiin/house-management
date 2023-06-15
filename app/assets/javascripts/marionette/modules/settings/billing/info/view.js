HousePad.TradeApp.module("Settings.Billing.Info", function(Info, TradeApp, Backbone, Marionette, $, _){

    Info.InfoView = Marionette.ItemView.extend({
        template: "#billing-info-template",
        tagName: "div",
        className: "row",

        ui: {
            btn_activate_plan: "#btn-activate-plan",
            btn_configure_payment: "#btn-configure-payment",
            btn_change_plan: "#btn-change-plan"
        },

        triggers: {
            "click @ui.btn_activate_plan": "billing-info:activate-plan",
            "click @ui.btn_configure_payment": "billing-info:configure-payment",
            "click @ui.btn_change_plan": "billing-info:change-plan"
        }
    });
});