HousePad.TradeApp.module("Inventory.Item.Edit.Invoice", function(Invoice, TradeApp, Backbone, Marionette, $, _){

    Invoice.InvoiceView = Marionette.ItemView.extend({
        template: "#item-invoice-template",
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
            Backbone.Radio.command("inventory-item-invoice-doc", "delete", doc_id);
            return false;
        },

        showErrorFeedback: function(message){
            $("#item-invoice-upload-feedback").html(message);
            $("#item-invoice-upload-feedback").addClass("alert-danger");
            $("#item-invoice-upload-feedback").removeClass("alert-success");
            $("#item-invoice-upload-feedback").show();
        },

        hideErrorFeedback: function(){
            $("#item-invoice-upload-feedback").hide();
        }

    });
});