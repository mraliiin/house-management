HousePad.TradeAppLayout = Backbone.Marionette.LayoutView.extend({
    template: "#app-layout-template",
    tagName: "div",
    className: "row",

    regions: {
        header: "#header-container",
        main_panel: "#main-panel-container",
        footer: "#footer-container"
    }
});