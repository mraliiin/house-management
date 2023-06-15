HousePad.TradeApp.module("Models", function(Models, TradeApp, Backbone, Marionette, $, _){

    Models.RoomImage = Backbone.Model.extend({
        urlRoot: "/trade/room_images",

        enter_edit_mode: function(){
            for (var i=0; i<this.get("snapshot_notes").length; i++) {
                var note = this.get("snapshot_notes").at(i);
                note.set("edit_mode", true);
            }
        },

        exit_edit_mode: function(){
            for (var i=0; i<this.get("snapshot_notes").length; i++) {
                var note = this.get("snapshot_notes").at(i);
                note.set("edit_mode", false);
            }
        }
    });

    Backbone.Radio.reply("models:images", "new", function(project, room_id){
        var image = new Models.RoomImage();
        image.url = '/trade/projects/' + project + '/rooms/' + room_id + '/images';

        return image;
    });
});