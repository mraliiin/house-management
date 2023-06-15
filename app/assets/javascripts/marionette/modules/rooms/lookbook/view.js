HousePad.TradeApp.module("Rooms.Lookbook", function(Lookbook, TradeApp, Backbone, Marionette, $, _){

    Lookbook.LookbookView = Marionette.ItemView.extend({
        template: "#room-lookbook-template",
        tagName: "div",
        className: "row",

        ui: {
            btn_delete_mode: ".btn-delete-mode",
            btn_edit_room_description: ".btn-edit-room-description",
            btn_update_room_description: ".btn-update-room-description",
            btn_cancel_update_description: ".btn-cancel-update-description"
        },

        triggers: {

            "click @ui.btn_edit_room_description": "rooms:edit-mode-description",
            "click @ui.btn_update_room_description": "rooms:update-room-description",
            "click @ui.btn_cancel_update_description": "rooms:cancel-update-description",
            "click @ui.btn_delete_mode": "rooms:delete-mode"
        },

        events: {
        },

        modelEvents: {
            "change": "render"
        }

    });

    Lookbook.BreadcrumbsView = Marionette.ItemView.extend({
        template: "#breadcrumbs-template",
        tagName: "div",
        className: "row",
    });
});