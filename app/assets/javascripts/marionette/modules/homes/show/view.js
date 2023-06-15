HousePad.TradeApp.module("Homes.Show", function(Show, TradeApp, Backbone, Marionette, $, _){

    Show.ShowHomeView = Marionette.ItemView.extend({
        template: "#show-home-template",
        tagName: "div",
        className: "row",

        ui: {
            btn_add_room: "#btn-add-room",
            btn_edit_home: ".btn-edit-home",
            btn_update_home: ".btn-update-home",
            btn_cancel_update: ".btn-cancel-update",
        },

        triggers: {
            "click @ui.btn_add_room": "homes:add-room",
            "click @ui.btn_edit_home": "homes:edit-mode",
            "click @ui.btn_update_home": "homes:update-home",
            "click @ui.btn_cancel_update": "homes:cancel-update",
        },

        events: {
            "click .btn-complete-project": "completeProject",
        },

        modelEvents: {
            "change": "render",
            "change:nest": "render"
        },

        completeProject: function(e) {
            e.stopPropagation();
            Show.Controller.markProjectAsCompleted();
        },

        showFailedUpdateHomeMessage: function() {
            $(".input-home-name").parent().addClass("has-error");
        }

    });

    Show.BreadcrumbsView = Marionette.ItemView.extend({
        template: "#breadcrumbs-template",
        tagName: "div",
        className: "row",
    });
});