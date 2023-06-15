HousePad.TradeApp.module("Inventory.Item.Edit.Images.List", function(List, TradeApp, Backbone, Marionette, $, _){

    List.startWithParent = false;

    List.on("start", function(options) {
        List.Controller.region = options["region"];
        List.Controller.show();
    });

    Backbone.Radio.comply("inventory_images", "reload", function(){
        List.Controller.reloadImages();
    });
});