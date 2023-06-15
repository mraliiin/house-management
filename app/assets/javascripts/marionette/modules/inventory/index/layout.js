HousePad.TradeApp.module("Inventory.Index", function(Index, TradeApp, Backbone, Marionette, $, _) {

    Index.IndexLayout = Backbone.Marionette.LayoutView.extend({
        template: "#inventory-index-template",
        tagName: "div",
        className: "row",

        regions: {
            inventory_filters: "#inventory-filters-container",
            inventory_items: "#inventory-items-container",
            inventory_breadcrumbs: "#inventory-breadcrumbs",

        }
    });

});