HousePad.TradeApp.module("Inventory.Item.Edit.Provenance", function(Provenance, TradeApp, Backbone, Marionette, $, _){

    Provenance.ProvenanceView = Marionette.ItemView.extend({
        template: "#item-provenance-template",
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
            Backbone.Radio.command("inventory-item-provenance-doc", "delete", $(e.currentTarget).data("id"));
            return false;
        },

        showErrorFeedback: function(message){
            $("#item-provenance-upload-feedback").html(message);
            $("#item-provenance-upload-feedback").addClass("alert-danger");
            $("#item-provenance-upload-feedback").removeClass("alert-success");
            $("#item-provenance-upload-feedback").show();
        },

        hideErrorFeedback: function(){
            $("#item-provenance-upload-feedback").hide();
        }

    });
});