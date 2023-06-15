HousePad.TradeApp.module("Settings", function(Settings, TradeApp, Backbone, Marionette, $, _){

    Settings.SettingsLayout = Backbone.Marionette.LayoutView.extend({
        template: "#settings-template",
        tagName: "div",
        className: "row",

        regions: {
            menu: "#settings-menu-container",
            container: "#settings-main-container"
        }
    });
});