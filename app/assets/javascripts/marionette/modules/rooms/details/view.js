HousePad.TradeApp.module("Rooms.Details", function(Details, TradeApp, Backbone, Marionette, $, _){

    Details.DetailsView = Marionette.ItemView.extend({
        template: "#room-details-template",
        tagName: "div",
        className: "row",

        ui: {
            btn_edit_room_description: ".btn-edit-room-description",
            btn_update_room_description: ".btn-update-room-description",
            btn_cancel_update_description: ".btn-cancel-update-description"
        },

        triggers: {
            "click @ui.btn_edit_room_description": "rooms:edit-mode-description",
            "click @ui.btn_update_room_description": "rooms:update-room-description",
            "click @ui.btn_cancel_update_description": "rooms:cancel-update-description",
        },

        events: {
        },

        modelEvents: {
            "change": "render"
        },

        showFailedUpdateRoomDescriptionMessage: function() {
            $(".input-room-description").parent().addClass("has-error");
        }
    });

    Details.BreadcrumbsView = Marionette.ItemView.extend({
        template: "#breadcrumbs-template",
        tagName: "div",
        className: "row",
    });
});