HousePad.TradeApp.module("Settings.Menu", function(Menu, TradeApp, Backbone, Marionette, $, _){

    Menu.MenuView = Marionette.ItemView.extend({
        template: "#settings-menu-template",
        tagName: "div",
        className: "row",

        ui: {
            nav_account_details: "#nav-settings-account-details",
            nav_billing: "#nav-settings-billing"
        },

        triggers: {
            //"click @ui.nav_account_details": "settings:nav-account-details",
            //"click @ui.nav_billing": "settings:nav-billing"
        }

    });
});