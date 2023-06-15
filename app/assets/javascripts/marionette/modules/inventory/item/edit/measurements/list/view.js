HousePad.TradeApp.module("Inventory.Item.Edit.Measurements.List", function(List, TradeApp, Backbone, Marionette, $, _){

    List.ConditionListView = Marionette.ItemView.extend({
        template: "#item-list-measurements-template",
        tagName: "div",
        className: "col-xs-12",

        ui: {
            "delete_item": ".delete-item-measurement"
        },

        triggers: {
        },

        events: {
            "click @ui.delete_item": "deleteItem"
        },

        deleteItem: function(e){
            e.stopPropagation();
            var id = $(e.currentTarget).data("id");
            Backbone.Radio.command("inventory-measurements", "delete:item", id);
            return false;
        },

        showErrorFeedback: function(message){
            $("#item-measurements-feedback").html(message);
            $("#item-measurements-feedback").addClass("alert-danger");
            $("#item-measurements-feedback").removeClass("alert-success");
            $("#item-measurements-feedback").show();
        },

        showSuccessFeedback: function(message){
            $("#item-measurements-feedback").html(message);
            $("#item-measurements-feedback").addClass("alert-success");
            $("#item-measurements-feedback").removeClass("alert-danger");
            $("#item-measurements-feedback").show();
        },

        hideErrorFeedback: function(){
            $("#item-measurements-feedback").hide();
        }
    });
});