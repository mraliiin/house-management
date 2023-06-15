HousePad.TradeApp.module("Clients.List", function (List, TradeApp, Backbone, Marionette, $, _) {

    List.Controller = {
        show: function () {
            this.trade_clients = Backbone.Radio.request("app:data", "trade_clients");

            // Main layout
            this.layout = new List.ClientsListLayout();
            TradeApp.Layout.getRegion("main_panel").show(this.layout);

            // Clients region
            this.listView = new List.ListView({collection: this.trade_clients});
            this.layout.getRegion("clients_list").show(this.listView);

            this.listView.on("clients:new-home", function () {
               // $('#clients-modal').modal("toggle");
                HousePad.TradeApp.module("Clients.Homes.NewHome").stop();
                HousePad.TradeApp.module("Clients.Homes.NewHome").start();
            });

            this.listView.on("clients:delete", function (client_id) {
                if (!confirm("Are you sure?")) {
                    return;
                }

                var client = this.collection.get(client_id);
                var delete_promise = client.destroy();
                if (delete_promise) {
                    $.when(delete_promise).done(function () {
                        List.Controller.listView.showSuccessfulDeleteMessage();
                        List.Controller.trade_clients.remove(client, {silent: true});
                        List.Controller.show();
                    });
                    $.when(delete_promise).fail(function () {
                        this.showErrorFeedback("Failed to delete client.");
                    });
                } else {
                    this.showErrorFeedback("Failed to delete client.");
                }
            });

            this.listView.on("projects:delete", function (client_id, house_id) {
                if (!confirm("Are you sure?")) {
                    return;
                }

                var client = this.collection.get(client_id);
                var house = client.get("houses").get(house_id);

                var delete_promise = house.destroy();
                if (delete_promise) {
                    $.when(delete_promise).done(function () {
                        List.Controller.listView.showSuccessfulDeleteMessage();
                        client.get("houses").remove(house);
                        List.Controller.listView.destroy();
                        List.Controller.show();
                    });
                    $.when(delete_promise).fail(function () {
                        this.showErrorFeedback("Failed to delete project.");
                    });
                } else {
                    this.showErrorFeedback("Failed to delete project.");
                }
            });

            this.listView.on("projects:complete", function (client_id, house_id) {
                if (!confirm("Are you sure?")) {
                    return;
                }

                var client = this.collection.get(client_id);
                var house = client.get("houses").get(house_id);
                house.set('trade_client_completed', 'true');

                var save_promise = $.post("/trade/homes/" + house_id, { home: house.toJSON() });
                if (save_promise) {
                    $.when(save_promise).done(function () {
                        $("button[data-id='"+ house_id +"']").hide();
                    });
                } else {
                    List.Controller.listView.hideProgress();
                    this.showInvalidFormMessage();
                }
            });

            List.Controller.listView.hideProgress();
        },

        reloadClients: function () {
            $("#page-overlay").show();

            var trade_clients = Backbone.Radio.request("models:trade_clients", "new");
            List.Controller._showClients(trade_clients);
        },

        filterClients: function (status) {
            $("#page-overlay").show();

            var Models = HousePad.TradeApp.module("Models");
            var trade_clients = new Models.TradeClients();

            trade_clients.url = (status != undefined && status != 'all')
                ? "/trade/clients?trade_client_completed=" + status
                : "/trade/clients";

            List.Controller._showClients(trade_clients, status);
        },

        _showClients: function (trade_clients, status) {
            var fetch_promise = trade_clients.fetch();

            if (fetch_promise) {
                $.when(fetch_promise).done(function () {
                    var Models = HousePad.TradeApp.module("Models");

                    for (var i = 0; i < trade_clients.length; i++) {
                        var trade_client = trade_clients.at(i);
                        trade_client.set("houses", new Models.Houses(trade_client.get("houses")));
                        trade_client.set('trade_client_completed', status);
                    }

                    Backbone.Radio.command("app:data", "set_trade_clients", trade_clients);
                    List.Controller.trade_clients = trade_clients;

                    $("#page-overlay").hide();
                    List.Controller.listView.destroy();
                    List.Controller.listView = new List.ListView({collection: List.Controller.trade_clients});
                    List.Controller.layout.getRegion("clients_list").show(List.Controller.listView);
                });
            }
        },

        loadNewClientTab: function(){
            TradeApp.module("Clients.NewClient").stop();
            TradeApp.module("Clients.NewClient").start({region: this.layout.getRegion("client_new")});
        },

        loadNewDDRTab: function(){
            TradeApp.module("Inventory.Item.RequestInfo").stop();
            TradeApp.module("Inventory.Item.RequestInfo").start({region: this.layout.getRegion("client_ddr")});
        },
    }
});
