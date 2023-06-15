HousePad.TradeApp.module("Models", function (Models, TradeApp, Backbone, Marionette, $, _) {

    Models.InventoryItemSection = Backbone.Model.extend({

        url: function () {
            return '/trade/inventory/item_sections'
        }
    });

    Models.InventoryItemSections = Backbone.Collection.extend({
        model: Models.InventoryItemSection
    });
});