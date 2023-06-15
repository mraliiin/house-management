HousePad.TradeApp.module("Inventory.Item.Show", function(Show, TradeApp, Backbone, Marionette, $, _) {

    Show.ShowLayout = Backbone.Marionette.LayoutView.extend({
        template: "#show-inventory-item-template",
        tagName: "div",
        className: "row",

        regions: {
            item_title: "#show-item-title-container",
            item_images: "#item-show-images-container"
        }
    });

});