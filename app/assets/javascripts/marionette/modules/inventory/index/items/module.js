HousePad.TradeApp.module("Inventory.Index.Items", function(Items, TradeApp, Backbone, Marionette, $, _){

    Items.startWithParent = false;

    Items.on("start", function(options) {
        Items.Controller.region = options["region"];
        Items.Controller.show();
    });

    Backbone.Radio.comply("inventory-items", "refine-search", function(){
        Items.Controller.filterInventoryItems();
    });
});