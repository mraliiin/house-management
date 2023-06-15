HousePad.TradeApp.module("Settings.Billing.Info.ConfirmSubscription", function(ConfirmSubscription, TradeApp, Backbone, Marionette, $, _){

    ConfirmSubscription.ConfirmSubscriptionView = Marionette.ItemView.extend({
        template: "#confirm-subscription-template",
        tagName: "div",
        className: "modal-dialog",

        ui: {
            btn_confirm_subscription: "#btn-confirm-subscription",
            btn_back_to_payment: "#btn-back-to-payment"
        },

        events: {
        },

        triggers: {
            "click @ui.btn_confirm_subscription" : "subscription:confirm",
            "click @ui.btn_back_to_payment": "subscription:back"
        },

        showSubscriptionUpdateFailed: function(){
            this.hideProgress();
            this.showErrorFeedback("Failed to save subscription information.");
            this.enableButtons();
        },

        showSubscriptionUpdated : function(){
            this.hideProgress();
            this.showSuccessfulSaveMessage();
        },

        hideFeedback: function() {
            $("#feedback-confirm-subscription-container").hide();
        },

        showErrorFeedback: function(error_message){
            $("#feedback-confirm-subscription").addClass("alert-danger");
            $("#feedback-confirm-subscription").removeClass("alert-success");
            $("#feedback-confirm-subscription").html(error_message);
            $("#feedback-confirm-subscription-container").show();
        },

        showSuccessfulSaveMessage: function(){
            $("#feedback-confirm-subscription").removeClass("alert-danger");
            $("#feedback-confirm-subscription").addClass("alert-success");
            $("#feedback-confirm-subscription").html("Subscription confirmed.");
            $("#feedback-confirm-subscription-container").show();
        },

        showProgress: function(){
            $("#confirm-subscription-progress").show();
        },

        hideProgress: function(){
            $("#confirm-subscription-progress").hide();
        },

        disableButtons: function() {
            $("#btn-confirm-subscription").addClass("disabled");
            $("#btn-back-to-payment").addClass("disabled");
        },

        enableButtons: function() {
            $("#btn-confirm-subscription").removeClass("disabled");
            $("#btn-back-to-payment").removeClass("disabled");
        }

    });
});