HousePad.TradeApp.module("Clients.NewClient", function(NewClient, TradeApp, Backbone, Marionette, $, _){

    NewClient.Controller = {

        show: function(options){
            var client_id = options["client_id"];

            if (typeof client_id != "undefined") {
                var trade_clients = Backbone.Radio.request("app:data", "trade_clients");
                this.client = trade_clients.get(client_id);
                this.newClientView = new NewClient.NewClientView({template: '#new-client-template-modal', model: this.client });

            } else {
                this.client = Backbone.Radio.request("models:trade_client", "new");
                this.newClientView = new NewClient.NewClientView({template: '#new-client-template', className: "row"});
            }

            this.newClientView.on("new-client:save", function(){
                NewClient.Controller.newClientView.showProgress();

                var client_data = Backbone.Syphon.serialize(this);
                var client = NewClient.Controller.client;
                client.set(client_data);

                var save_promise = client.save();
                if (save_promise) {
                    $.when(save_promise).done(NewClient.Controller.completeSaveNewClient);
                    $.when(save_promise).fail(function (client_data) {
                        NewClient.Controller.newClientView.hideProgress();
                        NewClient.Controller.newClientView.showFailedSaveMessage(client_data);
                    });
                } else {
                    NewClient.Controller.newClientView.hideProgress();
                    this.showInvalidFormMessage();
                }
            });

            this.newClientView.on("new-client:cancel", function(){
                Backbone.history.navigate("clients", {trigger: true});
            });

            if (NewClient.Controller.region) {
                NewClient.Controller.region.show(this.newClientView);
            } else {
                TradeApp.clients_modal.show(this.newClientView);
            }
        },

        completeSaveNewClient: function(){
            NewClient.Controller.newClientView.showSuccessfulSaveMessage();
            Backbone.Radio.command("clients", "reload");
            TradeApp.module("Clients.Homes.NewClient").stop();

            $('#clients-modal').modal("hide");
            NewClient.Controller.newClientView.hideProgress();
        },
    }
});
