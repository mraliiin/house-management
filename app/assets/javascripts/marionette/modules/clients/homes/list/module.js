HousePad.TradeApp.module("Clients.Homes.List", function(List, TradeApp, Backbone, Marionette, $, _){

    List.startWithParent = false;

    List.on("start", function(options) {
        List.Controller.region = options["region"];
        List.Controller.show();
    });

    Backbone.Radio.comply("homes", "reload", function(){
        List.Controller.reloadHomes();
    });
});