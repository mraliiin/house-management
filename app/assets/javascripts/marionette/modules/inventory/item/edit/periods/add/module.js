HousePad.TradeApp.module("Inventory.Item.Edit.Periods.Add", function(Add, TradeApp, Backbone, Marionette, $, _){

    Add.startWithParent = false;

    Add.on("start", function(options) {
        Add.Controller.region = options["region"];
        Add.Controller.show();
    });
});