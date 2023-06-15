HousePad.TradeApp.module("Homes.Rooms.New", function(New, TradeApp, Backbone, Marionette, $, _){

    New.NewRoomView = Marionette.ItemView.extend({
        template: "#new-room-template",
        tagName: "div",
        className: "modal-dialog",

        ui: {
            btn_save_room: "#btn-save-room",
        },

        triggers: {
            "click @ui.btn_save_room": "new-room:save",
            "change #client_selector": "new-room:client_changed"
        },

        showFailedSaveMessage: function(response){
            if (typeof response.responseJSON != "undefined" &&
                typeof response.responseJSON.error != "undefined") {
                this.showErrorFeedback(response.responseJSON.error);
            }
            else if (response.status != 200) {
                this.showErrorFeedback("Failed to save room.");
            }
        },

        showInvalidFormMessage: function(){
            this.showErrorFeedback("Invalid room info.");
        },

        showErrorFeedback: function(error_message){
            $("#new-room-feedback").addClass("alert-danger");
            $("#new-room-feedback").removeClass("alert-success");
            $("#new-room-feedback").html(error_message);
        },

        showSuccessfulSaveMessage: function(){
            $("#new-room-feedback").removeClass("alert-danger");
            $("#new-room-feedback").addClass("alert-success");
            $("#new-room-feedback").html("Room saved.");
        },

        showProgress: function(error_message){
            $("#new-room-progress").show();
        },

        hideProgress: function(error_message){
            $("#new-room-progress").hide();
        }

    });
});