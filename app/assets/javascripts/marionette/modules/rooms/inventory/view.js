HousePad.TradeApp.module("Rooms.Inventory", function(Inventory, TradeApp, Backbone, Marionette, $, _){

    Inventory.InventoryView = Marionette.ItemView.extend({
        template: "#room-inventory-template",
        tagName: "div",
        className: "row",

        ui: {
        },

        triggers: {
        },

        events: {
        },

        modelEvents: {
            "change": "render"
        }

    });

    Inventory.BreadcrumbsView = Marionette.ItemView.extend({
        template: "#breadcrumbs-template",
        tagName: "div",
        className: "row",
    });
});