HousePad.TradeApp.module("Inventory.Item.Edit.Materials.List", function(List, TradeApp, Backbone, Marionette, $, _){

    List.ListMaterialsView = Marionette.ItemView.extend({
        template: "#item-list-materials-template",
        tagName: "div",
        className: "col-xs-12",

        ui: {
        },

        triggers: {
        },

        events: {
            "click .delete-item-material": "deleteItem"
        },

        deleteItem: function(e){
            e.stopPropagation();
            Backbone.Radio.command("inventory-item-material", "delete", $(e.currentTarget).data("id"));
            return false;
        },

        showErrorFeedback: function(message){
            $("#item-materials-feedback").html(message);
            $("#item-materials-feedback").addClass("alert-danger");
            $("#item-materials-feedback").removeClass("alert-success");
            $("#item-materials-feedback").show();
        },

        showSuccessFeedback: function(message){
            $("#item-materials-feedback").html(message);
            $("#item-materials-feedback").addClass("alert-success");
            $("#item-materials-feedback").removeClass("alert-danger");
            $("#item-materials-feedback").show();
        },

        hideErrorFeedback: function(){
            $("#item-materials-feedback").hide();
        }
    });
});