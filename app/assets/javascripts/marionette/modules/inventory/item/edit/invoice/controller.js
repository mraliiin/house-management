HousePad.TradeApp.module("Inventory.Item.Edit.Invoice", function(Invoice, TradeApp, Backbone, Marionette, $, _){

    Invoice.Controller = {

        show: function(){
            if (Invoice.Controller.region) {

                this.inventory_item = Backbone.Radio.request("app:data", "inventory_item");

                this.invoiceView = new Invoice.InvoiceView({model: this.inventory_item});
                Invoice.Controller.region.show(this.invoiceView);

                this.createInvoiceDropzone();
            }

        },

        createInvoiceDropzone: function(){
            var item_invoice_preview = $("#item-invoice-preview-template");
            var item_invoice_preview_template = item_invoice_preview.parent().html();
            $("#item-invoice-preview-template").parent().remove();

            var upload_url = "/trade/inventory-items/"+Invoice.Controller.inventory_item.get("id")+"/upload_invoice_document";
            if (Invoice.Controller.inventory_item.get("edit_with_token")){
                upload_url += "?token="+Invoice.Controller.inventory_item.get("token");
            }

            this.itemInvoiceDropzone = new Dropzone(
                "#inventory-item-invoice-dropzone",
                {
                    url: upload_url, // Set the url
                    thumbnailWidth: 150,
                    thumbnailHeight: 150,
                    parallelUploads: 20,
                    maxFilesize: 5,
                    maxFiles: 10,
                    previewTemplate: item_invoice_preview_template,
                    //autoQueue: false, // Make sure the files aren't queued until manually added
                    //previewsContainer: "#room-images-dropzone", // Define the container to display the previews
                    clickable: "#inventory-item-invoice-dropzone" // Define the element that should be used as click trigger to select files.
                });

            this.itemInvoiceDropzone.on("success", function(file, response){
                //Remove the uploaded file so the dropzone can be reused
                Invoice.Controller.itemInvoiceDropzone.removeFile(file);
                Backbone.Radio.command("inventory_invoice", "reload");
            });

            this.itemInvoiceDropzone.on("error", function(file, errorMessage, xhr){
                //Remove the uploaded file so the dropzone can be reused
                Invoice.Controller.itemInvoiceDropzone.removeFile(file);

                Invoice.Controller.invoiceView.showErrorFeedback("Failed to upload invoice document");
            });

            this.itemInvoiceDropzone.on("addedfile", function(file){
                Invoice.Controller.invoiceView.hideErrorFeedback();
            });
        },


        reloadInvoiceDocs: function() {
            var load_promise = $.get("/trade/inventory-items/" + Invoice.Controller.inventory_item.id + "/invoice_documents", {token: Invoice.Controller.inventory_item.get("token")});
            if (load_promise) {
                $.when(load_promise).done(function(docs){
                    var Models = TradeApp.module("Models");
                    Invoice.Controller.inventory_item.set("inventory_invoice_docs", new Models.InventoryImages(docs));
                    Invoice.Controller.show();
                });
            }
        },


        deleteItemDoc: function(doc_id){
            if (!confirm("Are you sure?"))
                return;

            var doc = Invoice.Controller.inventory_item.get("inventory_invoice_docs").get(doc_id);

            Invoice.Controller.invoiceView.hideErrorFeedback();
            var delete_promise = doc.destroy({data: {token: Invoice.Controller.inventory_item.get("token")}, processData: true});
            if (delete_promise){
                $.when(delete_promise).done(function(){
                    Invoice.Controller.inventory_item.get("inventory_invoice_docs").remove(doc, {silent: true});
                    Invoice.Controller.show();
                });
                $.when(delete_promise).fail(function(){
                    Invoice.Controller.invoiceView.showErrorFeedback("Failed to delete invoice document.");
                });
            } else {
                Invoice.Controller.invoiceView.showErrorFeedback("Failed to delete invoice document.");
            }
        }

    }
});
