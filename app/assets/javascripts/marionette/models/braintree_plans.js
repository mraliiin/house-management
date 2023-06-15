HousePad.TradeApp.module("Models", function(Models, TradeApp, Backbone, Marionette, $, _){

    Models.BraintreePlan = Backbone.Model.extend({
    });

    Models.BraintreePlans = Backbone.Collection.extend({
        model: Models.BraintreePlan
    });

});