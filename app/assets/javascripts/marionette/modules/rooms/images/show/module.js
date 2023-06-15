HousePad.TradeApp.module("Rooms.Images.Show", function(Show, TradeApp, Backbone, Marionette, $, _){

    Show.startWithParent = false;

    Show.on("start", function(options) {
        Show.Controller.room_image = options["image"];
        Show.Controller.region = options.region;
        Show.Controller.show();
    });

    Show.on("stop", function(options) {
        Show.Controller.room_image.set("note_position", null);
        Show.Controller.room_image.set("add_note_mode", false);
    });
});