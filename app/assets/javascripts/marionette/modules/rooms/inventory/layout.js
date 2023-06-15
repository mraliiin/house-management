HousePad.TradeApp.module("Rooms.Inventory", function(Inventory, TradeApp, Backbone, Marionette, $, _) {

    Inventory.InventoryLayout = Backbone.Marionette.LayoutView.extend({
        template: "#room-template",
        tagName: "div",
        className: "row",

        regions: {
            room_header: "#room-header-container",
            room_inventory_filters: "#room-inventory-filters",
            room_inventory_items: "#room-inventory-items",
            rooms_breadcrumbs: '#room-breadcrumbs'
        }
    });

});