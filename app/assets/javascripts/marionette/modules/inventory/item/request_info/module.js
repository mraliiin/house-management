HousePad.TradeApp.module("Inventory.Item.RequestInfo", function(RequestInfo, TradeApp, Backbone, Marionette, $, _){

    RequestInfo.startWithParent = false;

    RequestInfo.on("start", function(options) {
        // Only load the form section (on clients page 2nd tab)
        if (options && options["region"]) {
            RequestInfo.Controller.region = options["region"];

        // Load the entire page
        } else {
            RequestInfo.Controller.region = null;
        }

        RequestInfo.Controller.show();
    });
});