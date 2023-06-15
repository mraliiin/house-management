HousePad.TradeApp.module("Settings.Billing.Info.SelectPlan", function(SelectPlan, TradeApp, Backbone, Marionette, $, _){

    SelectPlan.startWithParent = false;

    SelectPlan.on("start", function(options) {
        if (typeof(options) == "undefined" || typeof(options.mode) == "undefined")
            var options = {mode: "subscription"};

        TradeApp.addRegions({billing_info_modal: "#billing-info-modal"});
        SelectPlan.Controller.show(options);
    });

    SelectPlan.on("stop", function() {
        TradeApp.removeRegion("billing_info_modal");
    });
});