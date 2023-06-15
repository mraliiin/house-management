HousePad.TradeApp.module("Inventory.Item.Edit.Conditions.List", function(List, TradeApp, Backbone, Marionette, $, _){

    List.ConditionListView = Marionette.ItemView.extend({
        template: "#item-list-conditions-template",
        tagName: "div",
        className: "col-xs-12",

        ui: {
            "delete_item": ".delete-item-condition"
        },

        triggers: {
        },

        events: {
            "click @ui.delete_item": "deleteItem"
        },

        deleteItem: function(e){
            e.stopPropagation();
            var id = $(e.currentTarget).data("id");
            Backbone.Radio.command("inventory-conditions", "delete:item", id);
            return false;
        },

        showErrorFeedback: function(message){
            $("#item-conditions-feedback").html(message);
            $("#item-conditions-feedback").addClass("alert-danger");
            $("#item-conditions-feedback").removeClass("alert-success");
            $("#item-conditions-feedback").show();
        },

        showSuccessFeedback: function(message){
            $("#item-conditions-feedback").html(message);
            $("#item-conditions-feedback").addClass("alert-success");
            $("#item-conditions-feedback").removeClass("alert-danger");
            $("#item-conditions-feedback").show();
        },

        hideErrorFeedback: function(){
            $("#item-conditions-feedback").hide();
        }
    });
});