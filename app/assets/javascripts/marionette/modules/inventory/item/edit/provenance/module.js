HousePad.TradeApp.module("Inventory.Item.Edit.Provenance", function(Provenance, TradeApp, Backbone, Marionette, $, _){

    Provenance.startWithParent = false;

    Provenance.on("start", function(options) {
        Provenance.Controller.region = options["region"];
        Provenance.Controller.show();
    });


    Backbone.Radio.comply("inventory_provenance", "reload", function(){
        Provenance.Controller.reloadProvenanceDocs();
    });

    Backbone.Radio.comply("inventory-item-provenance-doc", "delete", function(doc_id){
        Provenance.Controller.deleteItemDoc(doc_id);
    });
});