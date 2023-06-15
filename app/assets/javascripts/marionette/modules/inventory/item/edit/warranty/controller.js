HousePad.TradeApp.module("Inventory.Item.Edit.Warranty", function(Warranty, TradeApp, Backbone, Marionette, $, _){

    Warranty.Controller = {

        show: function(){
            if (Warranty.Controller.region) {

                this.inventory_item = Backbone.Radio.request("app:data", "inventory_item");

                this.warrantyView = new Warranty.WarrantyView({model: this.inventory_item});
                Warranty.Controller.region.show(this.warrantyView);

                this.createWarrantyDropzone();
            }

        },

        createWarrantyDropzone: function(){
            var item_warranty_preview = $("#item-warranty-preview-template");
            var item_warranty_preview_template = item_warranty_preview.parent().html();
            $("#item-warranty-preview-template").parent().remove();

            var upload_url = "/trade/inventory-items/"+Warranty.Controller.inventory_item.get("id")+"/upload_warranty_document";
            if (Warranty.Controller.inventory_item.get("edit_with_token")){
                upload_url += "?token="+Warranty.Controller.inventory_item.get("token");
            }

            this.itemWarrantyDropzone = new Dropzone(
                "#inventory-item-warranty-dropzone",
                {
                    url: upload_url, // Set the url
                    thumbnailWidth: 150,
                    thumbnailHeight: 150,
                    parallelUploads: 20,
                    maxFilesize: 5,
                    maxFiles: 10,
                    previewTemplate: item_warranty_preview_template,
                    //autoQueue: false, // Make sure the files aren't queued until manually added
                    //previewsContainer: "#room-images-dropzone", // Define the container to display the previews
                    clickable: "#inventory-item-warranty-dropzone" // Define the element that should be used as click trigger to select files.
                });

            this.itemWarrantyDropzone.on("success", function(file, response){
                //Remove the uploaded file so the dropzone can be reused
                Warranty.Controller.itemWarrantyDropzone.removeFile(file);
                Backbone.Radio.command("inventory_warranty", "reload");
            });

            this.itemWarrantyDropzone.on("error", function(file, errorMessage, xhr){
                //Remove the uploaded file so the dropzone can be reused
                Warranty.Controller.itemWarrantyDropzone.removeFile(file);

                Warranty.Controller.warrantyView.showErrorFeedback("Failed to upload warranty document");
            });

            this.itemWarrantyDropzone.on("addedfile", function(file){
                Warranty.Controller.warrantyView.hideErrorFeedback();
            });
        },


        reloadWarrantyDocs: function() {
            var load_promise = $.get("/trade/inventory-items/" + Warranty.Controller.inventory_item.id + "/warranty_documents", {token: Warranty.Controller.inventory_item.get("token")});
            if (load_promise) {
                $.when(load_promise).done(function(docs){
                    var Models = TradeApp.module("Models");
                    Warranty.Controller.inventory_item.set("inventory_warranty_docs", new Models.InventoryImages(docs));
                    Warranty.Controller.show();
                });
            }
        },


        deleteItemDoc: function(doc_id){
            if (!confirm("Are you sure?"))
                return;

            var doc = Warranty.Controller.inventory_item.get("inventory_warranty_docs").get(doc_id);

            Warranty.Controller.warrantyView.hideErrorFeedback();
            var delete_promise = doc.destroy({data: {token: Warranty.Controller.inventory_item.get("token")}, processData: true});
            if (delete_promise){
                $.when(delete_promise).done(function(){
                    Warranty.Controller.inventory_item.get("inventory_warranty_docs").remove(doc, {silent: true});
                    Warranty.Controller.show();
                });
                $.when(delete_promise).fail(function(){
                    Warranty.Controller.warrantyView.showErrorFeedback("Failed to delete warranty document.");
                });
            } else {
                Warranty.Controller.warrantyView.showErrorFeedback("Failed to delete warranty document.");
            }
        }

    }
});
