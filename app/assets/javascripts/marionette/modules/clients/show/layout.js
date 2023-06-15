HousePad.TradeApp.module("Clients.ShowClient", function(ShowClient, TradeApp, Backbone, Marionette, $, _) {

    ShowClient.ShowClientLayout = Backbone.Marionette.LayoutView.extend({
        template: "#client-details-template",
        tagName: "div",
        className: "row",

        regions: {
            show_client: "#show-client-container",
            homes: "#client-homes-container",
            new_home: "#new-home-modal"
        }
    });

});