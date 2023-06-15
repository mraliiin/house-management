HousePad.TradeApp.module("Inventory.Item.Show.Images", function(Images, TradeApp, Backbone, Marionette, $, _){

    Images.Controller = {

        show: function(){
            if (Images.Controller.region) {

                this.inventory_item = Backbone.Radio.request("app:data", "inventory_item");

                this.imagesView = new Images.ImagesView({collection: this.inventory_item.get("inventory_images")});
                Images.Controller.region.show(this.imagesView);

                Backbone.Radio.comply("inventory-item-image", "show-main", function(image_id){
                    _.each(Images.Controller.inventory_item.get("inventory_images").models, function(image){
                        image.set("selected", false);
                    });
                    var image = Images.Controller.inventory_item.get("inventory_images").get(image_id);
                    image.set("selected", true);
                    Images.Controller.show();
                });
            }
        },

        selectFirstImage: function(){
            var inventory_item = Backbone.Radio.request("app:data", "inventory_item");
            if (inventory_item.get("inventory_images").length > 0) {
                _.each(inventory_item.get("inventory_images").models, function (image) {
                    image.set("selected", false);
                });
                inventory_item.get("inventory_images").at(0).set("selected", true);
            }
        }
    }
});
