HousePad.TradeApp.module("Inventory.Item.Edit.Images.List", function(List, TradeApp, Backbone, Marionette, $, _){

    List.Controller = {

        show: function(){
            if (List.Controller.region) {

                this.inventory_item = Backbone.Radio.request("app:data", "inventory_item");

                this.listImagesView = new List.ListImagesView({collection: this.inventory_item.get("inventory_images")});
                List.Controller.region.show(this.listImagesView);
            }

            Backbone.Radio.comply("inventory-item-image", "delete", function(image_id){
                if (!confirm("Are you sure?")) return;

                var image = List.Controller.inventory_item.get("inventory_images").get(image_id);

                List.Controller.listImagesView.hideErrorFeedback();
                var delete_promise = image.destroy({data: {token: List.Controller.inventory_item.get("token")}, processData: true});
                if (delete_promise){
                    $.when(delete_promise).done(function(){
                        List.Controller.inventory_item.get("inventory_images").remove(image, {silent: true});
                        List.Controller.listImagesView.render();
                    });
                    $.when(delete_promise).fail(function(){
                        List.Controller.listImagesView.showErrorFeedback("Failed to delete image.");
                    });
                } else {
                    List.Controller.listImagesView.showErrorFeedback("Failed to delete image.");
                }
            });

            Backbone.Radio.on("inventory-item-images", "reorder", function(){
                var image_ids = new Array();
                $(".edit-item-thumbnail-container").map(function(idx, image){
                    image_ids.push($(image).data("id"));
                });

                var save_promise = $.post("/trade/inventory-items/"+List.Controller.inventory_item.id+"/reorder_images", {image_ids: image_ids, token: List.Controller.inventory_item.get("token")});
                if (save_promise) {
                    $.when(save_promise).done(List.Controller.completeReorderImages);
                    $.when(save_promise).fail(function () {
                        List.Controller.listImagesView.render();
                    });
                } else {
                    List.Controller.listImagesView.render();
                }
            });
        },

        reloadImages: function(){
            var load_promise = $.get("/trade/inventory-items/"
                + List.Controller.inventory_item.id
                + "/images", {token: List.Controller.inventory_item.get("token")});

            if (load_promise) {
                $.when(load_promise).done(function(images){
                    var Models = TradeApp.module("Models");
                    List.Controller.inventory_item.set("inventory_images", new Models.InventoryImages(images));
                    List.Controller.show();
                });
            }
        },

        completeReorderImages: function(){
            var image_ids = new Array();
            $(".edit-item-thumbnail-container").map(function(idx, image){
                image_ids.push($(image).data("id"));
            });

            //Make sure the image models are in the order of image ids
            for (var i=0; i<image_ids.length; i++){
                var image_id = image_ids[i];
                var image = List.Controller.inventory_item.get("inventory_images").get(image_id);
                List.Controller.inventory_item.get("inventory_images").remove(image);
                List.Controller.inventory_item.get("inventory_images").add(image, {at: i});
            }
        }
    }
});
