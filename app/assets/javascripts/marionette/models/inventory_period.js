HousePad.TradeApp.module("Models", function (Models, TradeApp, Backbone, Marionette, $, _) {

    Models.InventoryPeriod = Backbone.Model.extend({
        url: function () {
            if (this.id > 0) {
                if (this.get("item_id")) {
                    return "/trade/inventory-items/" + this.get("item_id") + "/periods/" + this.id;
                } else {
                    return "/trade/inventory-items/periods/" + this.id;
                }
            } else {
                return "/trade/inventory-items/periods";
            }
        }
    });

    Models.InventoryPeriodsSelector = Backbone.Model.extend({});

    Models.InventoryPeriods = Backbone.Collection.extend({
        model: Models.InventoryPeriod
    });
});