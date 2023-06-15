HousePad.TradeApp.module("Homes.List", function(List, TradeApp, Backbone, Marionette, $, _){

    List.ListView = Marionette.ItemView.extend({
        template: "#homes-template",
        tagName: "div",
        className: "row user-homes",

        ui: {
            btn_add_room: ".btn-add-room",
            btn_save_room: "#btn-save-room",
            btn_delete_room: ".btn-delete-room"
        },

        triggers: {
            //"click @ui.btn_add_room": "rooms:add-room",
            //"click @ui.btn_save_room": "rooms:save-room"
        },

        events: {
            //"click @ui.btn_delete_room": "deleteRoom"
        }

    });
});