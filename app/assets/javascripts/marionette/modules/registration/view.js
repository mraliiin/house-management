HousePad.TradeApp.module("Registration", function(Registration, TradeApp, Backbone, Marionette, $, _){

    Registration.RegistrationView = Marionette.ItemView.extend({
        template: "#registration-template",
        tagName: "div",
        className: "row",

        triggers: {
            "click #btn-register": "registration:register",
            "click #btn-login": "registration:login"
        },


        enableTooltips: function(){
            $('[data-toggle="tooltip"]').tooltip();
        },

        showRegistrationFailedMessage: function(response){
            if (response &&
                typeof response.responseJSON != "undefined" &&
                typeof response.responseJSON.error != "undefined") {
                this.showErrorMessages(response.responseJSON.error);
                this.showErrorFeedback("Registration failed.");
            } else {
                this.showErrorFeedback("Registration failed.");
            }
        },

        showErrorMessages: function(errors){
            if (errors["email"]){
                $("#email-group").addClass("has-error");
                $("#email-help").html(errors["email"]);
                $("#email-help").show();
            }

            if (errors["phone"]) {
                $("#phone-group").addClass("has-error");
                $("#phone-help").html(errors["phone"]);
                $("#phone-help").show();
            }

            if (errors["password"]) {
                $("#password-group").addClass("has-error");
                $("#password-help").html(errors["password"]);
                $("#password-help").show();
            }

            if (errors["agree_terms"]) {
                $("#agree-terms-group").addClass("has-error");
                $("#agree-terms-help").html(errors["agree_terms"]);
                $("#agree-terms-help").show();
            }

            if (errors["message"]) {
                this.showErrorFeedback(errors["message"]);
            }
        },

        clearErrorMessages: function(errors){
            $("#email-group").removeClass("has-error");
            $("#email-group").removeClass("has-success");
            $("#email-help").hide();

            $("#phone-group").removeClass("has-error");
            $("#phone-group").removeClass("has-success");
            $("#phone-help").hide();

            $("#password-group").removeClass("has-error");
            $("#password-group").removeClass("has-success");
            $("#password-help").hide();

            $("#agree-terms-group").removeClass("has-error");
            $("#agree-terms-group").removeClass("has-success");
            $("#agree-terms-help").hide();

            this.hideFeedback();
        },

        showErrorFeedback: function(error_message){
            $("#registration-feedback").addClass("alert-danger");
            $("#registration-feedback").removeClass("alert-success");
            $("#registration-feedback").html(error_message);
            $("#registration-feedback-container").show();
        },

        hideFeedback: function(error_message){
            $("#registration-feedback-container").hide();
        },

        showSuccessfulRegistrationMessage: function(){
            $("#registration-feedback").removeClass("alert-danger");
            $("#registration-feedback").addClass("alert-success");
            $("#registration-feedback").html("Registration successful!");
            $("#registration-feedback-container").show();
        }
    });
});