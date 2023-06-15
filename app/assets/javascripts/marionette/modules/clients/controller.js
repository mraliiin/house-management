HousePad.TradeApp.module("Clients", function(Clients, TradeApp, Backbone, Marionette, $, _){

    Clients.Controller = {

        onRouteClients: function() {
            TradeApp.module("Clients.NewClient").stop();
            TradeApp.module("Clients.ShowClient").stop();
            TradeApp.module("Clients.List").start();
        },

        onRouteNewClient: function() {
            TradeApp.module("Clients.List").stop();
            TradeApp.module("Clients.ShowClient").stop();
            TradeApp.module("Clients.NewClient").start();
        },

        onRouteShowClient: function(client_id) {
            TradeApp.module("Clients.List").stop();
            TradeApp.module("Clients.NewClient").stop();
            TradeApp.module("Clients.ShowClient").start();
        }
    }
});
