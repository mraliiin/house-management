HousePad.TradeApp.module("Settings.Billing.Info.PaymentMethod", function(PaymentMethod, TradeApp, Backbone, Marionette, $, _){

    PaymentMethod.startWithParent = false;

    PaymentMethod.on("start", function(options) {
        if (typeof(options) == "undefined" || typeof(options.mode) == "undefined")
            var options = {mode: "subscription"};
        TradeApp.addRegions({billing_info_modal: "#billing-info-modal"});
        PaymentMethod.Controller.show(options);
    });

    PaymentMethod.on("stop", function() {
        TradeApp.removeRegion("billing_info_modal");
    });
});