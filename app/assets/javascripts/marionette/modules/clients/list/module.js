HousePad.TradeApp.module("Clients.List", function(List, TradeApp, Backbone, Marionette, $, _){

    List.startWithParent = false;

    List.on("start", function(options) {
        TradeApp.addRegions({clients_modal: "#clients-modal"});
        List.Controller.show();
    });

    Backbone.Radio.comply("clients", "reload", function(){
        List.Controller.reloadClients();
    });

    Backbone.Radio.on("clients", "view", function(client_id){
        $('#clients-modal').modal({});
        HousePad.TradeApp.module("Clients.ViewClient").stop();
        HousePad.TradeApp.module("Clients.ViewClient").start(client_id);
    });

    Backbone.Radio.on("clients", "edit", function(client_id){
        $('#clients-modal').modal({});
        HousePad.TradeApp.module("Clients.NewClient").stop();
        HousePad.TradeApp.module("Clients.NewClient").start({ client_id : client_id });
    });

    Backbone.Radio.comply("clients", "load-new", function() {
        List.Controller.loadNewClientTab();
    });

    Backbone.Radio.comply("clients", "ddr-new", function() {
        List.Controller.loadNewDDRTab();
    });

    Backbone.Radio.comply("clients", "status-changed", function(status){
        List.Controller.filterClients(status);
    });
});