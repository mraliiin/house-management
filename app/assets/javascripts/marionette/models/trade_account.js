HousePad.TradeApp.module("Models", function(Models, TradeApp, Backbone, Marionette, $, _){

    Models.TradeAccount = Backbone.Model.extend({
        urlRoot: "/trade/trade_accounts"
    });

    // Subscribe to a new request on the models:session channel
    Backbone.Radio.reply("models:trade_account", "new", function(){
        return new Models.TradeAccount();
    });

});