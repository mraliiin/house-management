HousePad.TradeApp.module("Inventory.Index.Filters", function(Filters, TradeApp, Backbone, Marionette, $, _){

    Filters.startWithParent = false;

    Filters.on("start", function(options) {
        Filters.Controller.region = options["region"];
        Filters.Controller.show();
    });


    Backbone.Radio.comply("inventory-items", "filters-changed", function(){
        HousePad.pageRouter.filtersChanged();
    });
});