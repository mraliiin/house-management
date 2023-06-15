HousePad.TradeApp.module("Models", function(Models, TradeApp, Backbone, Marionette, $, _){

    Models.House = Backbone.Model.extend({
        urlRoot: "/trade/homes",

        enter_delete_mode: function(){
            this.set("delete_mode", true);
            for (var i=0; i<this.get("rooms").length; i++) {
                var room = this.get("rooms").at(i);
                room.set("delete_mode", true);
            }
        },

        exit_delete_mode: function(){
            this.set("delete_mode", false);
            for (var i=0; i<this.get("rooms").length; i++) {
                var room = this.get("rooms").at(i);
                room.set("delete_mode", false);
            }
        }
    });

});