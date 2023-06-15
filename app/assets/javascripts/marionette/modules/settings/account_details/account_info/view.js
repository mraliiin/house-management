HousePad.TradeApp.module("Settings.AccountDetails.AccountInfo", function(AccountInfo, TradeApp, Backbone, Marionette, $, _){

    AccountInfo.AccountInfoView = Marionette.ItemView.extend({
        template: "#account-info-template",
        tagName: "div",
        className: "row",

        ui: {
            btn_submit: "#btn-update-account-details",
            btn_reset: "#btn-reset-account-details",
            btn_save_avatar: "#btn-save-avatar",
            btn_reset_avatar: "#btn-reset-avatar"
        },

        triggers: {
            "click @ui.btn_submit": "account-info:update",
            "click @ui.btn_reset": "account-info:reset"
        },


        showFailedUpdateMessage: function(response){
            if (typeof response.responseJSON != "undefined" &&
                typeof response.responseJSON.error != "undefined") {
                this.showErrorFeedback(response.responseJSON.error);
            }
            else if (response.status != 200) {
                this.showErrorFeedback("Failed to update account info.");
            }
        },

        showInvalidFormMessage: function(){
            this.showErrorFeedback("Invalid user info.");
        },


        showErrorFeedback: function(error_message){
            $("#account-info-feedback").addClass("alert-danger");
            $("#account-info-feedback").removeClass("alert-success");
            $("#account-info-feedback").html(error_message);
        },

        showSuccessfulUpdateMessage: function(){
            $("#account-info-feedback").removeClass("alert-danger");
            $("#account-info-feedback").addClass("alert-success");
            $("#account-info-feedback").html("Account info updated.");
        },

        showProgress: function(error_message){
            $("#account-info-progress").show();
        },

        hideProgress: function(error_message){
            $("#account-info-progress").hide();
        }

    });
});