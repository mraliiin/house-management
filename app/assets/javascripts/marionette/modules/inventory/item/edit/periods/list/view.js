HousePad.TradeApp.module("Inventory.Item.Edit.Periods.List", function(List, TradeApp, Backbone, Marionette, $, _){

    List.PeriodListView = Marionette.ItemView.extend({
        template: "#item-list-periods-template",
        tagName: "div",
        className: "col-xs-12",

        ui: {
            "delete_item": ".delete-item-period"
        },

        triggers: {
        },

        events: {
            "click @ui.delete_item": "deleteItem"
        },

        deleteItem: function(e){
            e.stopPropagation();
            var id = $(e.currentTarget).data("id");
            Backbone.Radio.command("inventory-periods", "delete:item", id);
            return false;
        },

        showErrorFeedback: function(message){
            $("#item-periods-feedback").html(message);
            $("#item-periods-feedback").addClass("alert-danger");
            $("#item-periods-feedback").removeClass("alert-success");
            $("#item-periods-feedback").show();
        },

        showSuccessFeedback: function(message){
            $("#item-periods-feedback").html(message);
            $("#item-periods-feedback").addClass("alert-success");
            $("#item-periods-feedback").removeClass("alert-danger");
            $("#item-periods-feedback").show();
        },

        hideErrorFeedback: function(){
            $("#item-periods-feedback").hide();
        }
    });
});