HousePad.TradeApp.module("Inventory.Item.Edit.Review", function(Review, TradeApp, Backbone, Marionette, $, _){

    Review.startWithParent = false;

    Review.on("start", function() {
        Review.Controller.show();
    });
});