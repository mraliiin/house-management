HousePad.TradeApp.module("Clients", function(Clients, TradeApp, Backbone, Marionette, $, _){

    Clients.Router = Backbone.Marionette.AppRouter.extend({
        controller: Clients.Controller,
        appRoutes: {
            "clients": "onRouteClients",
            "clients/new": "onRouteNewClient",
            "clients/:id": "onRouteShowClient"
        }
    });
});