HousePad.TradeApp.module("Inventory.Item.Edit", function(Edit, TradeApp, Backbone, Marionette, $, _){

    Edit.ItemTitleView = Marionette.ItemView.extend({
        template: "#item-title-template",
        tagName: "div",
        className: "col-xs-12",

        ui: {
        },

        triggers: {
        },

        events: {
        }

    });


    Edit.ItemSaveView = Marionette.ItemView.extend({
        template: "#item-save-template",
        tagName: "div",
        className: "col-xs-12",

        ui: {
            btn_save_item: "#btn-save-item",
            btn_cancel_edit_item: "#btn-cancel-edit-item"
        },

        triggers: {
            "click @ui.btn_save_item": "inventory-item:save",
            "click @ui.btn_cancel_edit_item": "inventory-item:cancel-edit",
            "click #btn-save-review-item": "inventory-item:review",
        },

        events: {
        },

        showProgress: function(){
            $("#item-save-progress").show();
        },

        hideProgress: function(error_message){
            $("#item-save-progress").hide();
        },

        showFailedSaveMessage: function(message){
            if(message) {
                this.showItemFeedback(message, "alert-danger");
            } else {
                this.showItemFeedback("Failed to save item. Please try again or contact <a href='mailto:support@housepadapp.com'>support@Housepadapp.com</a>.", "alert-danger");
            }
        },

        showSuccessfulSaveMessage: function(){
            this.showItemFeedback("Item saved successfully.", "alert-success");
        },

        showItemFeedback: function(feedback, alert_class){
            $("#item-feedback").html(feedback);
            $("#item-feedback").removeClass("alert-danger");
            $("#item-feedback").removeClass("alert-success");
            $("#item-feedback").addClass(alert_class);
            $("#item-feedback").show();
        },

        hideItemFeedback: function(){
            $("#item-feedback").hide();
        }
    });


    Edit.FailedNewItemView = Marionette.ItemView.extend({
        template: "#new-item-failed-template",
        tagName: "div",
        className: "row"
    });
});