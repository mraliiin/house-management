HousePad.TradeApp.module("Inventory.Item.Edit.Warranty", function(Warranty, TradeApp, Backbone, Marionette, $, _){

    Warranty.WarrantyView = Marionette.ItemView.extend({
        template: "#item-warranty-template",
        tagName: "div",
        className: "col-xs-12",

        ui: {
            delete_item_doc: ".delete-item-doc"
        },

        triggers: {
        },

        events: {
            "click @ui.delete_item_doc": "deleteItemDoc"
        },

        deleteItemDoc: function(e){
            e.stopPropagation();

            var doc_id = $(e.currentTarget).data("id");
            //this.trigger("images:view", image_id);
            Backbone.Radio.command("inventory-item-warranty-doc", "delete", doc_id);
            return false;
        },

        showErrorFeedback: function(message){
            $("#item-warranty-upload-feedback").html(message);
            $("#item-warranty-upload-feedback").addClass("alert-danger");
            $("#item-warranty-upload-feedback").removeClass("alert-success");
            $("#item-warranty-upload-feedback").show();
        },

        hideErrorFeedback: function(){
            $("#item-warranty-upload-feedback").hide();
        }

    });
});