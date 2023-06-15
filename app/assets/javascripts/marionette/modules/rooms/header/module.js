HousePad.TradeApp.module("Rooms.Header", function(Header, TradeApp, Backbone, Marionette, $, _){

    Header.startWithParent = false;

    Header.on("start", function(options) {
        Header.Controller.region = options["region"];
        Header.Controller.show();
    });
});