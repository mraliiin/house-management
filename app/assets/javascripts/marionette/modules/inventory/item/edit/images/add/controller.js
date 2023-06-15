HousePad.TradeApp.module("Inventory.Item.Edit.Images.Add", function(Add, TradeApp, Backbone, Marionette, $, _){

    Add.Controller = {

        show: function(){
            if (Add.Controller.region) {

                this.inventory_item = Backbone.Radio.request("app:data", "inventory_item");

                this.addImagesView = new Add.AddImagesView({model: this.inventory_item});
                Add.Controller.region.show(this.addImagesView);

                this.createItemImagesDropzone();
            }

        },

        createItemImagesDropzone: function(){
            var item_image_preview = $("#item-image-preview-template");
            var item_image_preview_template = item_image_preview.parent().html();
            $("#item-image-preview-template").parent().remove();

            var upload_image_url = "/trade/inventory-items/"+Add.Controller.inventory_item.get("id")+"/upload_item_image";
            if (Add.Controller.inventory_item.get("edit_with_token")){
                upload_image_url += "?token="+Add.Controller.inventory_item.get("token");
            }

            this.itemImagesDropzone = new Dropzone(
                "#inventory-item-images-dropzone",
                {
                    url: upload_image_url, // Set the url
                    thumbnailWidth: 150,
                    thumbnailHeight: 150,
                    parallelUploads: 20,
                    maxFilesize: 5,
                    maxFiles: 10,
                    previewTemplate: item_image_preview_template,
                    //autoQueue: false, // Make sure the files aren't queued until manually added
                    //previewsContainer: "#room-images-dropzone", // Define the container to display the previews
                    clickable: "#inventory-item-images-dropzone" // Define the element that should be used as click trigger to select files.
                });

            this.itemImagesDropzone.on("success", function(file, response){
                //Remove the uploaded file so the dropzone can be reused
                Add.Controller.itemImagesDropzone.removeFile(file);
                Backbone.Radio.command("inventory_images", "reload");
            });

            this.itemImagesDropzone.on("error", function(file, errorMessage, xhr){
                //Remove the uploaded file so the dropzone can be reused
                Add.Controller.itemImagesDropzone.removeFile(file);

                Add.Controller.addImagesView.showErrorFeedback("Failed to upload image");
            });

            this.itemImagesDropzone.on("addedfile", function(file){
                Add.Controller.addImagesView.hideErrorFeedback();
            });
        }

    }
});
