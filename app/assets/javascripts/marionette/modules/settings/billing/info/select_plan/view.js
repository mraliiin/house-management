HousePad.TradeApp.module("Settings.Billing.Info.SelectPlan", function(SelectPlan, TradeApp, Backbone, Marionette, $, _){

    SelectPlan.SelectPlanView = Marionette.ItemView.extend({
        template: "#select-plan-template",
        tagName: "div",
        className: "modal-dialog",

        ui: {
            braintree_plan: ".braintree-plan",
            btn_braintree_plan_selected: "#btn-braintree-plan-selected",
            btn_confirm_plan: "#btn-confirm-plan"
        },

        events: {
            "click @ui.braintree_plan" : "selectBraintreePlan"
        },

        triggers: {
            "click @ui.btn_braintree_plan_selected": "braintree-plan:selected",
            "click @ui.btn_confirm_plan": "braintree-plan:confirm"
        },

        selectBraintreePlan: function(e){
            e.stopPropagation();
            this.trigger("braintree-plan:select", e.currentTarget);
        },


        showPlanUpdateFailed: function(){
            this.hideProgress();
            this.showErrorFeedback("Failed to update plan.");
        },

        showPlanUpdated : function(){
            this.hideProgress();
            this.showSuccessfulSaveMessage();
        },

        hideFeedback: function() {
            $("#feedback-plan-container").hide();
        },


        showErrorFeedback: function(error_message){
            $("#feedback-plan").addClass("alert-danger");
            $("#feedback-plan").removeClass("alert-success");
            $("#feedback-plan").html(error_message);
            $("#feedback-plan-container").show();
        },

        showSuccessfulSaveMessage: function(){
            $("#feedback-plan").removeClass("alert-danger");
            $("#feedback-plan").addClass("alert-success");
            $("#feedback-plan").html("Plan updated.");
            $("#feedback-plan-container").show();
        },

        showProgress: function(){
            $("#plan-progress").show();
        },

        hideProgress: function(){
            $("#plan-progress").hide();
        }

    });
});