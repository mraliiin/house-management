HousePad.TradeApp.module("Models", function (Models, TradeApp, Backbone, Marionette, $, _) {

    Models.InventoryCondition = Backbone.Model.extend({
        url: function () {
            if (this.id > 0) {
                if (this.get("item_id")) {
                    return "/trade/inventory-items/" + this.get("item_id") + "/conditions/" + this.id;
                } else {
                    return "/trade/inventory-items/conditions/" + this.id;
                }
            } else {
                return "/trade/inventory-items/conditions";
            }
        }
    });

    Models.InventoryConditionsSelector = Backbone.Model.extend({});

    Models.InventoryConditions = Backbone.Collection.extend({
        model: Models.InventoryCondition
    });

});