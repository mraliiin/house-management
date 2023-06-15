HousePad.TradeApp.module("Clients.ViewClient", function(ViewClient, TradeApp, Backbone, Marionette, $, _){

    ViewClient.startWithParent = false;

    ViewClient.on("start", function(client_id) {
        ViewClient.Controller.show(client_id);
    });
});