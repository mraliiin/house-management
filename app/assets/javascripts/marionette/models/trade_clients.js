HousePad.TradeApp.module("Models", function(Models, TradeApp, Backbone, Marionette, $, _){

    Models.TradeClients = Backbone.Collection.extend({
        model: Models.TradeClient
    });


    // Subscribe to a new request on the models:session channel
    Backbone.Radio.reply("models:trade_clients", "new", function(){
        var trade_clients = new Models.TradeClients();
        trade_clients.url = "/trade/clients";
        return trade_clients;
    });
});