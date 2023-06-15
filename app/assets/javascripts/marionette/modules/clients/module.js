HousePad.TradeApp.module("Clients", function(Clients, TradeApp, Backbone, Marionette, $, _){

    Clients.startWithParent = false;

    Clients.on("start", function(options) {
        this.Router = new Clients.Router();
    });
});