HousePad.TradeApp.module("Inventory.Item.RequestInfo", function(RequestInfo, TradeApp, Backbone, Marionette, $, _) {

    RequestInfo.RequestInfoLayout = Backbone.Marionette.LayoutView.extend({
        template: "#inventory-request-template",
        tagName: "div",
        className: "row",

        regions: {
            inventory_request_info: "#inventory-request-info",
            ddr_breadcrumbs: "#ddr-breadcrumbs",
        }
    });
});