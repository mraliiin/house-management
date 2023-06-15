HousePad.TradeApp.module("Inventory.Item.Show.Images", function(Images, TradeApp, Backbone, Marionette, $, _){

    Images.startWithParent = false;

    Images.on("start", function(options) {
        Images.Controller.region = options["region"];
        Images.Controller.selectFirstImage();
        Images.Controller.show();
    });
});