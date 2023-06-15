HousePad.TradeApp.module("Clients.ShowClient", function(ShowClient, TradeApp, Backbone, Marionette, $, _){

    ShowClient.Controller = {

        show: function(){
            this.layout = new ShowClient.ShowClientLayout();
            TradeApp.Layout.getRegion("main_panel").show(this.layout);

            this.trade_client = Backbone.Radio.request("app:data", "trade_client");
            this.clientView = new ShowClient.ShowClientView({model: this.trade_client});

            this.layout.getRegion("show_client").show(this.clientView);

            //Start client homes list module
            HousePad.TradeApp.module("Clients.Homes.List").start({region: this.layout.getRegion("homes")});
        },


        reloadClient: function(){

            var trade_client = Backbone.Radio.request("models:trade_client", "new");
            var fetch_promise = trade_clients.fetch();

            if (fetch_promise) {
                $.when(fetch_promise).done(function(){
                    Backbone.Radio.command("app:data", "set_trade_client", trade_client);
                    List.Controller.show();
                });
            }
        }

    }
});
