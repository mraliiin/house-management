HousePad.TradeApp.module("Inventory.Item.Edit.Warranty", function(Warranty, TradeApp, Backbone, Marionette, $, _){

    Warranty.startWithParent = false;

    Warranty.on("start", function(options) {
        Warranty.Controller.region = options["region"];
        Warranty.Controller.show();
    });

    Backbone.Radio.comply("inventory_warranty", "reload", function(){
        Warranty.Controller.reloadWarrantyDocs();
    });

    Backbone.Radio.comply("inventory-item-warranty-doc", "delete", function(doc_id){
        Warranty.Controller.deleteItemDoc(doc_id);
    });
});