HousePad.TradeApp.module("Login", function(Login, TradeApp, Backbone, Marionette, $, _){

    Login.startWithParent = false;

    Login.on("start", function() {
        Login.Controller.show();
    });
});