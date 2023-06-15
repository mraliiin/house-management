HousePad.TradeApp.module("Clients.ViewClient", function(ViewClient, TradeApp, Backbone, Marionette, $, _){

    ViewClient.Controller = {

        show: function(client_id){
            if (typeof client_id != "undefined") {
                var trade_clients = Backbone.Radio.request("app:data", "trade_clients");
                this.client = trade_clients.get(client_id);
                this.viewClientView = new ViewClient.ViewClientView({model: this.client});
            } else {
                this.client = Backbone.Radio.request("models:trade_client", "new");
                this.viewClientView = new ViewClient.ViewClientView();
            }

            TradeApp.clients_modal.show(this.viewClientView);
        }
    }
});
