HousePad.TradeApp.module("Inventory.Item.Edit.Care", function(Care, TradeApp, Backbone, Marionette, $, _){

    Care.Controller = {

        show: function(){
            if (Care.Controller.region) {

                this.inventory_item = Backbone.Radio.request("app:data", "inventory_item");

                this.careView = new Care.CareView({model: this.inventory_item});
                Care.Controller.region.show(this.careView);

                this.createCareDropzone();
            }
        },

        createCareDropzone: function(){
            var item_care_preview = $("#item-care-preview-template");
            var item_care_preview_template = item_care_preview.parent().html();
            $("#item-care-preview-template").parent().remove();

            var upload_url = "/trade/inventory-items/"+Care.Controller.inventory_item.get("id")+"/upload_care_document";
            if (Care.Controller.inventory_item.get("edit_with_token")){
                upload_url += "?token="+Care.Controller.inventory_item.get("token");
            }

            this.itemCareDropzone = new Dropzone(
                "#inventory-item-care-dropzone",
                {
                    url: upload_url, // Set the url
                    thumbnailWidth: 150,
                    thumbnailHeight: 150,
                    parallelUploads: 20,
                    maxFilesize: 5,
                    maxFiles: 10,
                    previewTemplate: item_care_preview_template,
                    //autoQueue: false, // Make sure the files aren't queued until manually added
                    //previewsContainer: "#room-images-dropzone", // Define the container to display the previews
                    clickable: "#inventory-item-care-dropzone" // Define the element that should be used as click trigger to select files.
                });

            this.itemCareDropzone.on("success", function(file, response){
                //Remove the uploaded file so the dropzone can be reused
                Care.Controller.itemCareDropzone.removeFile(file);
                Backbone.Radio.command("inventory_care", "reload");
            });

            this.itemCareDropzone.on("error", function(file, errorMessage, xhr){
                //Remove the uploaded file so the dropzone can be reused
                Care.Controller.itemCareDropzone.removeFile(file);

                Care.Controller.careView.showErrorFeedback("Failed to upload care document");
            });

            this.itemCareDropzone.on("addedfile", function(file){
                Care.Controller.careView.hideErrorFeedback();
            });
        },

        reloadCareDocs: function() {
            var load_promise = $.get("/trade/inventory-items/" + Care.Controller.inventory_item.id + "/care_documents", {token: Care.Controller.inventory_item.get("token")});
            if (load_promise) {
                $.when(load_promise).done(function(docs){
                    var Models = TradeApp.module("Models");
                    Care.Controller.inventory_item.set("inventory_care_docs", new Models.InventoryImages(docs));
                    Care.Controller.show();
                });
            }
        },

        deleteItemDoc: function(doc_id){
            if (!confirm("Are you sure?"))
                return;

            var doc = Care.Controller.inventory_item.get("inventory_care_docs").get(doc_id);

            Care.Controller.careView.hideErrorFeedback();
            var delete_promise = doc.destroy({data: {token: Care.Controller.inventory_item.get("token")}, processData: true});
            if (delete_promise){
                $.when(delete_promise).done(function(){
                    Care.Controller.inventory_item.get("inventory_care_docs").remove(doc, {silent: true});
                    Care.Controller.show();
                });
                $.when(delete_promise).fail(function(){
                    Care.Controller.careView.showErrorFeedback("Failed to delete care document.");
                });
            } else {
                Care.Controller.careView.showErrorFeedback("Failed to delete care document.");
            }
        }

    }
});
