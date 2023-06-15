HousePad.TradeApp.module("Clients.ShowClient", function(ShowClient, TradeApp, Backbone, Marionette, $, _){

    ShowClient.startWithParent = false;

    ShowClient.on("start", function(client_id) {
        ShowClient.Controller.show();
    });

    Backbone.Radio.comply("client", "reload", function(){
        ShowClient.Controller.reloadClient();
    });
});