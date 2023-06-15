HousePad.TradeApp.module("Inventory.Item.Edit.Images.Add", function(Add, TradeApp, Backbone, Marionette, $, _){

    Add.AddImagesView = Marionette.ItemView.extend({
        template: "#item-add-images-template",
        tagName: "div",
        className: "col-xs-12",

        ui: {
            delete_item_image: ".delete-item-image"
        },

        triggers: {
        },

        events: {
        },

        showErrorFeedback: function(message){
            $("#item-image-upload-feedback").html(message);
            $("#item-image-upload-feedback").addClass("alert-danger");
            $("#item-image-upload-feedback").removeClass("alert-success");
            $("#item-image-upload-feedback").show();
        },

        hideErrorFeedback: function(){
            $("#item-image-upload-feedback").hide();
        }

    });
});