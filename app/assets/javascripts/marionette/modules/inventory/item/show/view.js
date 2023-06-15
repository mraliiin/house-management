HousePad.TradeApp.module("Inventory.Item.Show", function(Show, TradeApp, Backbone, Marionette, $, _){

    Show.ItemTitleView = Marionette.ItemView.extend({
        template: "#show-item-title-template",
        tagName: "div",
        className: "col-xs-12",

        ui: {
            btn_edit_item: ".btn-edit-item",
        },

        triggers: {
            "click @ui.btn_edit_item": "item:edit",
        },


        events: {
        }

    });

});