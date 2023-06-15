HousePad.TradeApp.module("Clients.NewClient", function(NewClient, TradeApp, Backbone, Marionette, $, _){

    NewClient.NewClientView = Marionette.ItemView.extend({
        tagName: "div",
        className: "modal-dialog",

        ui: {
            btn_save_new_client: "#btn-save-new-client",
            btn_cancel_new_client: "#btn-cancel-new-client"
        },

        triggers: {
            "click @ui.btn_save_new_client": "new-client:save",
            "click @ui.btn_cancel_new_client": "new-client:cancel"
        },


        showFailedSaveMessage: function(response){
            if (typeof response.responseJSON != "undefined" &&
                typeof response.responseJSON.error != "undefined") {
                this.showErrorFeedback(response.responseJSON.error);
            }
            else if (response.status != 200) {
                this.showErrorFeedback("Failed to save client.");
            }
        },

        showInvalidFormMessage: function(){
            this.showErrorFeedback("Invalid client info.");
        },

        showErrorFeedback: function(error_message){
            $("#new-client-feedback").addClass("alert-danger");
            $("#new-client-feedback").removeClass("alert-success");
            $("#new-client-feedback").html(error_message);
        },

        showSuccessfulSaveMessage: function(){
            $("#new-client-feedback").removeClass("alert-danger");
            $("#new-client-feedback").addClass("alert-success");
            $("#new-client-feedback").html("Client saved.");
        },

        showProgress: function(error_message){
            $("#new-client-progress").show();
        },

        hideProgress: function(error_message){
            $("#new-client-progress").hide();
        }

    });
});