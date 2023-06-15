HousePad.TradeApp.module("Inventory.Item.Edit.Care", function(Care, TradeApp, Backbone, Marionette, $, _){

    Care.CareView = Marionette.ItemView.extend({
        template: "#item-care-template",
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
            Backbone.Radio.command("inventory-item-care-doc", "delete", doc_id);
            return false;
        },

        showErrorFeedback: function(message){
            $("#item-care-upload-feedback").html(message);
            $("#item-care-upload-feedback").addClass("alert-danger");
            $("#item-care-upload-feedback").removeClass("alert-success");
            $("#item-care-upload-feedback").show();
        },

        hideErrorFeedback: function(){
            $("#item-care-upload-feedback").hide();
        }

    });
});