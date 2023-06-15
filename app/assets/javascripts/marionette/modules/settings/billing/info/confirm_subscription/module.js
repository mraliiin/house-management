HousePad.TradeApp.module("Settings.Billing.Info.ConfirmSubscription", function(ConfirmSubscription, TradeApp, Backbone, Marionette, $, _){

    ConfirmSubscription.startWithParent = false;

    ConfirmSubscription.on("start", function() {
        TradeApp.addRegions({billing_info_modal: "#billing-info-modal"});
        ConfirmSubscription.Controller.show();
    });

    ConfirmSubscription.on("stop", function() {
        TradeApp.removeRegion("billing_info_modal");
    });
});