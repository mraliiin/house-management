HousePad.TradeApp.module("Clients.ViewClient", function(ViewClient, TradeApp, Backbone, Marionette, $, _){

    ViewClient.ViewClientView = Marionette.ItemView.extend({
        template: "#view-client-template",
        tagName: "div",
        className: "modal-dialog",

        ui: {
            btn_edit_client: "#btn-edit-client",
            btn_cancel: "#btn-cancel"
        },

        triggers: {

        },

        events: {
            "click @ui.btn_edit_client": "editClient"
        },

        editClient: function(e){
            e.stopPropagation();
            var client_id = $(e.currentTarget).data("id");

            Backbone.Radio.trigger("clients", "edit", client_id);
        }

    });
});