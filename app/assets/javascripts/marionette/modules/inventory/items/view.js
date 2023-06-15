HousePad.TradeApp.module("Inventory.Items", function(Items, TradeApp, Backbone, Marionette, $, _){

    Items.ItemsView = Marionette.ItemView.extend({
        template: "#inventory-items-template",
        tagName: "div",

        ui: {
            btn_cancel_update: ".btn-cancel-update",
        },

        triggers: {
        },

        events: {
        }

    });
});