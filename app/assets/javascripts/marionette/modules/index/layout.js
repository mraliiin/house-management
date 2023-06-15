HousePad.TradeApp.module("Index", function(Index, TradeApp, Backbone, Marionette, $, _) {

    Index.IndexLayout = Backbone.Marionette.LayoutView.extend({
        template: "#index-template",
        tagName: "div",
        className: "row",

        regions: {
            homes: "#homes",
            clients: "#clients"
        }
    });

});