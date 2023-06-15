HousePad.TradeApp.module("Rooms.Header", function(Header, TradeApp, Backbone, Marionette, $, _){

    Header.HeaderView = Marionette.ItemView.extend({
        template: "#room-header-template",
        tagName: "div",
        className: "row",

        ui: {
            btn_edit_room: ".btn-edit-room",
            btn_update_room: ".btn-update-room",
            btn_cancel_update: ".btn-cancel-update",
        },

        triggers: {
            "click @ui.btn_edit_room": "rooms:edit-mode",
            "click @ui.btn_update_room": "rooms:update-room",
            "click @ui.btn_cancel_update": "rooms:cancel-update",
        },

        events: {
        },

        showFailedUpdateRoomMessage: function() {
            $(".input-room-name").parent().addClass("has-error");
        }

    });
});