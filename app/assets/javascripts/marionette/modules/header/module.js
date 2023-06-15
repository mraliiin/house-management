HousePad.TradeApp.module("Header", function(Header, TradeApp, Backbone, Marionette, $, _){

    Header.on("start", function() {
        Header.Controller.showHeader();
    });
});