HousePad.TradeApp.module("Inventory.Index.Items", function(Items, TradeApp, Backbone, Marionette, $, _){

    Items.ItemsView = Marionette.ItemView.extend({
        template: "#inventory-items-template",
        tagName: "div",
        className: "inventory-items",

        ui: {
        },

        triggers: {
        },

        events: {
            'click a.btn_prev': function(e){
                e.preventDefault();
                Backbone.Radio.command("inventory-filters", "page-changed", -1);
            },

            'click a.btn_next': function(e){
                e.preventDefault();
                Backbone.Radio.command("inventory-filters", "page-changed", +1);
            },
        },
    });
});