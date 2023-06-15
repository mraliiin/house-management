HousePad.TradeApp.module("Clients.NewClient", function(NewClient, TradeApp, Backbone, Marionette, $, _){

    NewClient.startWithParent = false;

    NewClient.on("start", function(options) {
        if (options["region"]) {
            NewClient.Controller.region = options["region"];
        } else {
            NewClient.Controller.region = null;
        }

        NewClient.Controller.show(options);
    });
});