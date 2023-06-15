HousePad.TradeApp.module("Models", function(Models, TradeApp, Backbone, Marionette, $, _){

    Models.Houses = Backbone.Collection.extend({
        model: Models.House,

        enter_edit_mode: function(){
            for (var i=0; i<this.length; i++) {
                var house = this.at(i);
                house.set("edit_mode", true);
            }
        },

        exit_delete_mode: function(){
            for (var i=0; i<this.length; i++) {
                var house = this.at(i);
                house.set("edit_mode", false);
            }
        }
    });


    // Subscribe to a new request on the models:houses channel
    Backbone.Radio.reply("models:houses", "new", function(trade_client_id){
        var houses = new Models.Houses();
        houses.url = "/trade/clients/"+trade_client_id+"/houses";
        return houses;
    });

});