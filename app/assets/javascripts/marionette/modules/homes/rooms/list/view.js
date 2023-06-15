HousePad.TradeApp.module("Homes.Rooms.List", function(List, TradeApp, Backbone, Marionette, $, _){

    List.ListView = Marionette.ItemView.extend({
        template: "#home-rooms-template",
        tagName: "div",
        className: "row",

        ui: {
            btn_add_room: ".btn-add-room",
            btn_save_room: "#btn-save-room",
            btn_delete_room: ".btn-delete-room",
            btn_delete_mode: ".btn-delete-mode"
        },

        triggers: {
            "click @ui.btn_add_room": "rooms:add-room",
            "click @ui.btn_save_room": "rooms:save-room",
            "click @ui.btn_delete_mode": "rooms:delete-mode"
        },

        events: {
            "click @ui.btn_delete_room": "deleteRoom"
        },

        onShow: function(){
            $("#home-rooms-sortable").sortable({update: function(){
                Backbone.Radio.trigger("rooms", "reorder");
            }});
        },

        deleteRoom: function(e){
            e.stopPropagation();
            if (!confirm("Are you sure?")) {
                return;
            }

            $(".rooms-feedback").hide();
            var room_id = $(e.currentTarget).data("id");
            this.trigger("rooms:delete", room_id);
        },

        showErrorFeedback: function(error_message){
            $(".rooms-feedback").addClass("alert-danger");
            $(".rooms-feedback").removeClass("alert-success");
            $(".rooms-feedback").html(error_message);
            $(".rooms-feedback").show();
        },

        showSuccessfulDeleteMessage: function(){
            $(".rooms-feedback").removeClass("alert-danger");
            $(".rooms-feedback").addClass("alert-success");
            $(".rooms-feedback").html("Room deleted.");
            $(".rooms-feedback").show();
        }



    });
});