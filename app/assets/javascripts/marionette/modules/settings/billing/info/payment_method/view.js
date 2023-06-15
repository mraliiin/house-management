HousePad.TradeApp.module("Settings.Billing.Info.PaymentMethod", function(PaymentMethod, TradeApp, Backbone, Marionette, $, _){

    PaymentMethod.PaymentMethodView = Marionette.ItemView.extend({
        template: "#payment-method-template",
        tagName: "div",
        className: "modal-dialog",

        ui: {
            //btn_save_payment_method: "#btn-save-payment-method"
            btn_back_to_plans: "#btn-back-to-plans"
        },

        events: {
        },

        triggers: {
            //"click @ui.btn_save_payment_method" : "payment-method:save"
            "click @ui.btn_back_to_plans": "payment-method:back"
        },

        showPaymentMethodUpdateFailed: function(){
            this.hideProgress();
            this.showErrorFeedback("Failed to update payment method.");
        },

        showPaymentMethodUpdated : function(){
            this.hideProgress();
            this.showSuccessfulSaveMessage();
        },

        hideFeedback: function() {
            $("#feedback-payment-method-container").hide();
        },


        showErrorFeedback: function(error_message){
            $("#feedback-payment-method").addClass("alert-danger");
            $("#feedback-payment-method").removeClass("alert-success");
            $("#feedback-payment-method").html(error_message);
            $("#feedback-payment-method-container").show();
        },

        showSuccessfulSaveMessage: function(){
            $("#feedback-payment-method").removeClass("alert-danger");
            $("#feedback-payment-method").addClass("alert-success");
            $("#feedback-payment-method").html("Payment method updated.");
            $("#feedback-payment-method-container").show();
        },

        showProgress: function(error_message){
            $("#payment-method-progress").show();
        },

        hideProgress: function(error_message){
            $("#payment-method-progress").hide();
        }

    });
});