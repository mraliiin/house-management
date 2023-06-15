HousePad.TradeApp.module("Inventory.Item.Edit.Care", function(Care, TradeApp, Backbone, Marionette, $, _){

    Care.startWithParent = false;

    Care.on("start", function(options) {
        Care.Controller.region = options["region"];
        Care.Controller.show();
    });


    Backbone.Radio.comply("inventory_care", "reload", function(){
        Care.Controller.reloadCareDocs();
    });

    Backbone.Radio.comply("inventory-item-care-doc", "delete", function(doc_id){
        Care.Controller.deleteItemDoc(doc_id);
    });
});