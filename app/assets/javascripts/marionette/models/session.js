HousePad.TradeApp.module("Models", function(Models, TradeApp, Backbone, Marionette, $, _){

    Models.Session = Backbone.Model.extend({
        urlRoot: "/trade/sessions"
    });

    // Subscribe to a new request on the models:session channel
    Backbone.Radio.reply("models:session", "new", function(){
        return new Models.Session();
    });

});