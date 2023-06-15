HousePad.TradeApp.module("Models", function(Models, TradeApp, Backbone, Marionette, $, _){

    Models.RoomImages = Backbone.Collection.extend({
        model: Models.RoomImage,

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
});