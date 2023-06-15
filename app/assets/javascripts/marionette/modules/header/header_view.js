HousePad.TradeApp.module("Header", function(Header, TradeApp, Backbone, Marionette, $, _){

    Header.HeaderView = Marionette.ItemView.extend({
        template: "#header-template",
        tagName: "div",
        className: "row",

        triggers: {
        }

    });
});