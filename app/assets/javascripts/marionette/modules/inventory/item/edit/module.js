HousePad.TradeApp.module("Inventory.Item.Edit", function(Edit, TradeApp, Backbone, Marionette, $, _){

    Edit.startWithParent = false;

    Edit.on("start", function() {
        var inventory_item = Backbone.Radio.request("app:data", "inventory_item");

        if (typeof(inventory_item).get("id") == "undefined") {
            Edit.Controller.createTemporaryInventoryItem();

        } else {
            Edit.Controller.show();
        }
    });

    Backbone.Radio.comply("inventory-item", "save-item", function(){
        Edit.Controller.saveItem();
    });
});