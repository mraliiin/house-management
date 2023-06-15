HousePad.TradeApp.module("Settings.AccountDetails.Avatar", function(Avatar, TradeApp, Backbone, Marionette, $, _){

    Avatar.AvatarView = Marionette.ItemView.extend({
        template: "#avatar-template",
        tagName: "div",
        className: "row",

        ui: {
            btn_submit: "#btn-update-account-details",
            btn_reset: "#btn-reset-account-details",
            btn_save_avatar: "#btn-save-avatar",
            btn_reset_avatar: "#btn-reset-avatar"
        },

        triggers: {
            "click @ui.btn_reset_avatar": "avatar:reset",
            "click @ui.btn_save_avatar": "avatar:update"
        },


        showAvatarFailedUpdateMessage: function(response){
            if (typeof response.responseJSON != "undefined" &&
                typeof response.responseJSON.error != "undefined") {
                this.showErrorFeedback(response.responseJSON.error);
            }
            else if (response.status != 204) {
                this.showErrorFeedback("Failed to update avatar.");
            }
        },

        showErrorFeedback: function(error_message){
            $("#avatar-feedback").addClass("alert-danger");
            $("#avatar-feedback").removeClass("alert-success");
            $("#avatar-feedback").html(error_message);
        },

        showSuccessfulUpdateMessage: function(){
            $("#avatar-feedback").removeClass("alert-danger");
            $("#avatar-feedback").addClass("alert-success");
            $("#avatar-feedback").html("Avatar updated.");
        },

        showProgress: function(error_message){
            $("#avatar-progress").show();
        },

        hideProgress: function(error_message){
            $("#avatar-progress").hide();
        }

    });
});