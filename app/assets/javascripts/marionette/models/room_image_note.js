HousePad.TradeApp.module("Models", function(Models, TradeApp, Backbone, Marionette, $, _){

    Models.RoomImageNote = Backbone.Model.extend({
        url: function(){
            if (this.get("snapshot_id")){
                if (this.id) {
                    return "/trade/room_images/" + this.get("snapshot_id") + "/notes/" + this.id;
                } else {
                    return "/trade/room_images/" + this.get("snapshot_id") + "/notes";
                }
            }
        }
    });

    // Subscribe to a new request on the models:room_image_note channel
    Backbone.Radio.reply("models:room_image_note", "new", function(){
        return new Models.RoomImageNote();
    });
});