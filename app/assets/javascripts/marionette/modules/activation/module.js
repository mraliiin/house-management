HousePad.TradeApp.module("Activation", function(Activation, TradeApp, Backbone, Marionette, $, _){

    Activation.startWithParent = false;

    Activation.on("start", function() {
        Activation.Controller.show();
    });
});