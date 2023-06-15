HousePad.TradeApp.module("Rooms.Details", function(Details, TradeApp, Backbone, Marionette, $, _) {

    Details.DetailsLayout = Backbone.Marionette.LayoutView.extend({
        template: "#room-template",
        tagName: "div",
        className: "row",

        regions: {
            room_header: "#room-header-container",
            room_details: "#room-details-container",
            breadcrumbs: '#breadcrumbs-container'
        }
    });

});