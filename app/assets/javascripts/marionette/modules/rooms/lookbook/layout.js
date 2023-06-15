HousePad.TradeApp.module("Rooms.Lookbook", function(Lookbook, TradeApp, Backbone, Marionette, $, _) {

    Lookbook.LookbookLayout = Backbone.Marionette.LayoutView.extend({
        template: "#room-template",
        tagName: "div",
        className: "row",

        regions: {
            room_header: "#room-header-container",
            room_lookbook: "#room-lookbook-container",
            images: "#room-images-container",
            room_image_modal: "#room-image-modal",
            breadcrumbs: '#breadcrumbs-container'
        }
    });
});