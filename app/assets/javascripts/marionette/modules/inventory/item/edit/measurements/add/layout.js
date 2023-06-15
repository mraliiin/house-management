HousePad.TradeApp.module("Inventory.Item.Edit.Measurements.Add", function(Add, TradeApp, Backbone, Marionette, $, _) {

    Add.Layout = Backbone.Marionette.LayoutView.extend({
        template: "#measurements-template",
        tagName: "div",
        className: "row",

        regions: {
            add_measurements: "#item-add-default-measurements-container",
            add_extra_measurements: "#item-add-extra-measurements-container",
        }
    });
});