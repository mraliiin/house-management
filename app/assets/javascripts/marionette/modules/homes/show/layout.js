HousePad.TradeApp.module("Homes.Show", function(Show, TradeApp, Backbone, Marionette, $, _) {

    Show.ShowHomeLayout = Backbone.Marionette.LayoutView.extend({
        template: "#home-details-template",
        tagName: "div",
        className: "row",

        regions: {
            show_home: "#show-home-container",
            rooms: "#home-rooms-container",
            new_room: "#new-room-modal",
            breadcrumbs: '#breadcrumbs-container'
        }
    });
});