HousePad.TradeApp.module("Settings.AccountDetails.Avatar", function(Avatar, TradeApp, Backbone, Marionette, $, _){

    Avatar.startWithParent = false;

    Avatar.on("start", function() {
        Avatar.Controller.show();
    });

    Avatar.on("stop", function() {
       Avatar.Controller.avatarDropzone.disable();
    });
});