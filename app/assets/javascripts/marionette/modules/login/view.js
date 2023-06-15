HousePad.TradeApp.module("Login", function(Login, TradeApp, Backbone, Marionette, $, _){

    Login.LoginView = Marionette.ItemView.extend({
        template: "#login-panel",
        tagName: "div",
        className: "row",

        triggers: {
            "click #btn-login": "login:login",
            "click #btn-register": "login:register"
        },


        showFailedLoginMessage: function(login_data, a, b, c){
            if (typeof login_data.responseJSON != "undefined" &&
                typeof login_data.responseJSON.error != "undefined") {
                this.showErrorFeedback(login_data.responseJSON.error);
            }
        },

        showInvalidFormMessage: function(){
            this.showErrorFeedback("Invalid username and/or password.");
        },


        showErrorFeedback: function(error_message){
            $("#login-feedback").addClass("alert-danger");
            $("#login-feedback").removeClass("alert-success");
            $("#login-feedback").html(error_message);
        },

        showSuccessfulLoginMessage: function(){
            $("#login-feedback").removeClass("alert-danger");
            $("#login-feedback").addClass("alert-success");
            $("#login-feedback").html("Login successful!");
        }
    });
});