HousePad.TradeApp.module("Inventory.Item.Edit", function(Edit, TradeApp, Backbone, Marionette, $, _) {

    Edit.EditLayout = Backbone.Marionette.LayoutView.extend({
        template: "#edit-inventory-item-template",
        tagName: "div",
        className: "row",

        regions: {
            item_title: "#item-title-container",
            item_images: "#item-list-images-container",
            item_add_images: "#item-add-images-container",
            item_categories: "#item-list-categories-container",
            item_add_categories: "#item-add-categories-container",
            item_conditions: "#item-list-conditions-container",
            item_add_conditions: "#item-add-conditions-container",
            item_periods: "#item-list-periods-container",
            item_add_periods: "#item-add-periods-container",
            item_measurements: "#item-list-measurements-container",
            item_add_measurements: "#item-add-measurements-container",
            item_care: "#item-care-container",
            item_warranty: "#item-warranty-container",
            item_invoice: "#item-invoice-container",
            item_save: "#item-save-container",
            item_provenance: "#item-provenance-container",
            item_materials: "#item-materials-container",
            item_materials: "#item-list-materials-container",
            item_add_materials: "#item-add-materials-container",
        }
    });
});