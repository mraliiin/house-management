HousePad.TradeApp.module("Inventory.Item.Edit.Measurements.Add", function(Add, TradeApp, Backbone, Marionette, $, _){

    Add.startWithParent = false;

    Add.on("start", function(options) {
        Add.Controller.region = options["region"];
        Add.Controller.show();
    });

    Backbone.Radio.comply("inventory-measurements", "save-current-measurement", function(form){
        Add.Controller.saveMeasurements(form);
    });
});