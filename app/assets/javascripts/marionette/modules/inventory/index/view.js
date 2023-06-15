HousePad.TradeApp.module("Inventory.Index", function(Index, TradeApp, Backbone, Marionette, $, _){
    Index.BreadcrumbsView = Marionette.ItemView.extend({
        template: "#breadcrumbs-template",
        tagName: "div",
    });
});