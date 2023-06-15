HousePad.TradeApp.module("Footer", function(Footer, TradeApp, Backbone, Marionette, $, _){

    Footer.FooterView = Marionette.ItemView.extend({
        template: "#footer-template",
        tagName: "div",
        className: "row",

        triggers: {
        }

    });
});