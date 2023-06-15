HousePad.TradeApp.module("Registration", function(Registration, TradeApp, Backbone, Marionette, $, _){

    Registration.startWithParent = false;

    Registration.on("start", function() {
        Registration.Controller.show();
    });
});