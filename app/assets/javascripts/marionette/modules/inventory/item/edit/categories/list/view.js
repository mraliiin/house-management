HousePad.TradeApp.module("Inventory.Item.Edit.Categories.List", function(List, TradeApp, Backbone, Marionette, $, _){

    List.ListCategoriesView = Marionette.ItemView.extend({
        template: "#item-list-categories-template",
        tagName: "div",
        className: "col-xs-12",

        ui: {
            "delete_item_category": ".delete-item-category"
        },

        triggers: {
        },

        events: {
            "click @ui.delete_item_category": "deleteItemCategory"
        },

        deleteItemCategory: function(e){
            e.stopPropagation();

            var cat_id = $(e.currentTarget).data("id");
            //this.trigger("images:view", image_id);
            Backbone.Radio.command("inventory-item-category", "delete", cat_id);
            return false;
        },

        onShow: function(){
            //$("#item-images-sortable").sortable({update: function(){
            //    Backbone.Radio.trigger("inventory-item-images", "reorder");
            //}});
        },

        showErrorFeedback: function(message){
            $("#item-categories-feedback").html(message);
            $("#item-categories-feedback").addClass("alert-danger");
            $("#item-categories-feedback").removeClass("alert-success");
            $("#item-categories-feedback").show();
        },

        showSuccessFeedback: function(message){
            $("#item-categories-feedback").html(message);
            $("#item-categories-feedback").addClass("alert-success");
            $("#item-categories-feedback").removeClass("alert-danger");
            $("#item-categories-feedback").show();
        },

        hideErrorFeedback: function(){
            $("#item-categories-feedback").hide();
        }

    });
});