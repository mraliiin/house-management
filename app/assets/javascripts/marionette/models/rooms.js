HousePad.TradeApp.module("Models", function(Models, TradeApp, Backbone, Marionette, $, _){

    Models.Rooms = Backbone.Collection.extend({
        model: Models.Room,

        enter_edit_mode: function(){
            for (var i=0; i<this.length; i++) {
                var obj = this.at(i);
                obj.set("edit_mode", true);
            }
        },

        exit_delete_mode: function(){
            for (var i=0; i<this.length; i++) {
                var obj = this.at(i);
                obj.set("edit_mode", false);
            }
        }
    });


    // Subscribe to a new request on the models:rooms channel
    Backbone.Radio.reply("models:rooms", "new", function(house_id){
        var rooms = new Models.Rooms();
        rooms.url = "/trade/homes/"+house_id+"/rooms";
        return rooms;
    });
});