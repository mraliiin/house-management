HousePad.TradeApp.module("Inventory.Item.Edit.Invoice", function(Invoice, TradeApp, Backbone, Marionette, $, _){

    Invoice.startWithParent = false;

    Invoice.on("start", function(options) {
        Invoice.Controller.region = options["region"];
        Invoice.Controller.show();
    });


    Backbone.Radio.comply("inventory_invoice", "reload", function(){
        Invoice.Controller.reloadInvoiceDocs();
    });

    Backbone.Radio.comply("inventory-item-invoice-doc", "delete", function(doc_id){
        Invoice.Controller.deleteItemDoc(doc_id);
    });
});