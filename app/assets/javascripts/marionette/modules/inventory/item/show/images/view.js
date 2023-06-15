HousePad.TradeApp.module("Inventory.Item.Show.Images", function(Images, TradeApp, Backbone, Marionette, $, _){

    Images.ImagesView = Marionette.ItemView.extend({
        template: "#item-show-images-template",
        tagName: "div",
        className: "row",

        ui: {
            item_thumbnail_img: ".item-thumbnail-img"
        },

        triggers: {
        },

        events: {
            "click @ui.item_thumbnail_img": "changeMainImage"
        },

        changeMainImage: function(e){
            e.stopPropagation();

            var image_id = $(e.currentTarget).data("id");
            //this.trigger("images:view", image_id);
            Backbone.Radio.command("inventory-item-image", "show-main", image_id);
        }

    });
});