HousePad.TradeApp.module("Inventory.Filters", function(Filters, TradeApp, Backbone, Marionette, $, _){

    Filters.FiltersView = Marionette.ItemView.extend({
        template: "#inventory-filters-template",
        tagName: "div",
        className: "row",

        ui: {
            btn_new_item: "#btn-new-item",
        },

        triggers: {
            "click @ui.btn_new_item": "item:new",
        },

        events: {
        }
    });
});