HousePad.TradeApp.module("Inventory.Item.Edit.Review", function(Review, TradeApp, Backbone, Marionette, $, _){

    Review.ItemView = Marionette.ItemView.extend({
        template: "#review-item-title-template",
        tagName: "div",
        className: "col-xs-12",

        ui: {
            btn_edit_item: ".btn-edit-item",
        },

        triggers: {
            "click #btn-cancel-review-item": "item:cancel-review",
            "click #btn-save-review-item": "item:save-review",
        },

        events: {
        }
    });

});