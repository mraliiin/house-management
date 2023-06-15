HousePad.TradeApp.module("Clients.Homes.NewHome", function(NewHome, TradeApp, Backbone, Marionette, $, _){

    NewHome.NewHomeView = Marionette.ItemView.extend({
        template: "#new-home-template",
        tagName: "div",
        className: "modal-dialog",

        ui: {
            btn_save_home: "#btn-save-home",
            btn_clients_save_home: "#btn_clients_save_home",
        },

        triggers: {
            "click @ui.btn_save_home": "new-home:save",
            "click @ui.btn_clients_save_home": "new-clients-home:save",
        },

        showFailedSaveMessage: function(response){
            if (typeof response.responseJSON != "undefined" &&
                typeof response.responseJSON.error != "undefined") {
                this.showErrorFeedback(response.responseJSON.error);
            }
            else if (response.status != 200) {
                this.showErrorFeedback("Failed to save home.");
            }
        },

        showInvalidFormMessage: function(){
            this.showErrorFeedback("Invalid client info.");
        },

        showErrorFeedback: function(error_message){
            $("#new-home-feedback").addClass("alert-danger");
            $("#new-home-feedback").removeClass("alert-success");
            $("#new-home-feedback").html(error_message);
        },

        showSuccessfulSaveMessage: function(){
            $("#new-home-feedback").removeClass("alert-danger");
            $("#new-home-feedback").addClass("alert-success");
            $("#new-home-feedback").html("Home saved.");
        },

        showProgress: function(error_message){
            $("#new-home-progress").show();
        },

        hideProgress: function(error_message){
            $("#new-home-progress").hide();
        }

    });
});