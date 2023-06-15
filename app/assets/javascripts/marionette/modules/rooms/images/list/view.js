HousePad.TradeApp.module("Rooms.Images.List", function(List, TradeApp, Backbone, Marionette, $, _){

    List.ListView = Marionette.ItemView.extend({
        template: "#room-images-template",
        tagName: "div",
        className: "row",

        ui: {
            btn_add_image: ".btn-add-image",
            btn_save_image: "#btn-save-image",
            btn_delete_image: ".btn-del-image",
            room_image: ".room-image"
        },

        triggers: {
            "click @ui.btn_add_room": "images:add-image",
            "click @ui.btn_save_room": "images:save-image"
        },

        events: {
            "click @ui.btn_delete_image": "deleteImage",
            "click @ui.room_image": "viewImageDetails"
        },

        onShow: function(){
            $("#room-images-sortable").sortable({update: function(){
                Backbone.Radio.trigger("images", "reorder");
            }});
        },

        deleteImage: function(e){
            e.stopPropagation();

            if (confirm("Are you sure?")) {
                var image_id = $(e.currentTarget).data("id");
                this.trigger("images:delete", image_id);
            }
        },

        viewImageDetails: function(e){
            e.stopPropagation();

            var image_id = $(e.currentTarget).data("id");
            //this.trigger("images:view", image_id);
            Backbone.Radio.command("image", "view", image_id);
        }


    });
});