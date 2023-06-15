HousePad.TradeApp.module("Activation", function(Activation, TradeApp, Backbone, Marionette, $, _) {

    Activation.ActivationView = Marionette.ItemView.extend({
        template: "#activation-template",
        tagName: "div",
        className: "row",

        ui: {
            btn_confirm: "#btn-confirm",
            btn_cancel: "#btn-cancel"
        },

        triggers: {
            "click @ui.btn_confirm": "activation:confirm",
            "click @ui.btn_cancel": "activation:cancel"
        },


        showFailedSaveMessage: function (response) {
            if (typeof response.responseJSON != "undefined" &&
                typeof response.responseJSON.error != "undefined") {
                this.showErrorFeedback(response.responseJSON.error);
            }
            else if (response.status != 200) {
                this.showErrorFeedback("Failed to save client.");
            }
        },

        showInvalidFormMessage: function () {
            this.showErrorFeedback("You must accept the terms before you can continue.");
        },

        showErrorFeedback: function (error_message) {
            $("#activation-feedback").addClass("alert-danger");
            $("#activation-feedback").removeClass("alert-success");
            $("#activation-feedback").html(error_message);
        },

        hideFeedback: function () {
            $("#activation-feedback").removeClass("alert-danger");
            $("#activation-feedback").removeClass("alert-success");
            $("#activation-feedback").html("");
        },

        showProgress: function (error_message) {
            $("#activation-progress").show();
        },

        hideProgress: function (error_message) {
            $("#activation-progress").hide();
        }

    });


    Activation.ConfirmationView = Marionette.ItemView.extend({
        template: "#confirmation-template",
        tagName: "div",
        className: "row"
    });


});