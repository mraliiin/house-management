HousePad.TradeApp.module("Models", function (Models, TradeApp, Backbone, Marionette, $, _) {
    Models.InventoryMaterial = Backbone.Model.extend({
        url: function () {
            if (this.id > 0 && this.get("item_id")) {
                return "/trade/inventory-items/" + this.get("item_id") + "/materials/" + this.id;
            }
            else {
                return "/trade/inventory-items/categories";
            }
        }
    });

    Models.InventoryMaterialsSelector = Backbone.Model.extend({});

    Models.InventoryMaterials = Backbone.Collection.extend({
        model: Models.InventoryMaterial
    });
});