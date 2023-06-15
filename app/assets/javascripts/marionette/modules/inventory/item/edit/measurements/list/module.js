HousePad.TradeApp.module("Inventory.Item.Edit.Measurements.List", function(List, TradeApp, Backbone, Marionette, $, _){

    List.startWithParent = false;

    List.on("start", function(options) {
        List.Controller.region = options["region"];
        List.Controller.show();
    });

    Backbone.Radio.comply("inventory-measurements", "delete:item", function(id){
        List.Controller.deleteMeasurement(id);
    });

    Backbone.Radio.comply("inventory-measurements", "reload:measurements-list", function(){
        List.Controller.show();
    });
});