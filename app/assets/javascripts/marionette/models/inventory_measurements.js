HousePad.TradeApp.module("Models", function (Models, TradeApp, Backbone, Marionette, $, _) {

    Models.InventoryMeasurement = Backbone.Model.extend({
       /* url: function () {
            if (this.id > 0) {
                if (this.get("item_id")) {
                    return "/trade/inventory-items/" + this.get("item_id") + "/dimensions/" + this.id;
                } else {
                    return "/trade/inventory-items/dimensions/" + this.id;
                }
            } else {
                return "/trade/inventory-items/dimensions";
            }
        }*/
    });

    Models.InventoryMeasurementsSelector = Backbone.Model.extend({});

    Models.InventoryMeasurements = Backbone.Collection.extend({
        model: Models.InventoryMeasurement
    });
});