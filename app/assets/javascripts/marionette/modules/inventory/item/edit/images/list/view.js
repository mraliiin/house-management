HousePad.TradeApp.module("Inventory.Item.Edit.Images.List", function(List, TradeApp, Backbone, Marionette, $, _){

    List.ListImagesView = Marionette.ItemView.extend({
        template: "#item-list-images-template",
        tagName: "div",
        className: "col-xs-12",

        ui: {
            "delete_item_image": ".delete-item-image"
        },

        triggers: {
        },

        events: {
            "click @ui.delete_item_image": "deleteItemImage"
        },

        onShow: function(){
            $("#item-images-sortable").sortable({update: function(){
                Backbone.Radio.trigger("inventory-item-images", "reorder");
            }});
        },

        deleteItemImage: function(e){
            e.stopPropagation();

            var image_id = $(e.currentTarget).data("id");
            //this.trigger("images:view", image_id);
            Backbone.Radio.command("inventory-item-image", "delete", image_id);
        },

        showErrorFeedback: function(message){
            $("#item-images-feedback").html(message);
            $("#item-images-feedback").addClass("alert-danger");
            $("#item-images-feedback").removeClass("alert-success");
            $("#item-images-feedback").show();
        },

        hideErrorFeedback: function(){
            $("#item-images-feedback").hide();
        }

    });
});