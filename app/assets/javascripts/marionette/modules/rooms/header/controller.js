HousePad.TradeApp.module("Rooms.Header", function(Header, TradeApp, Backbone, Marionette, $, _){

    Header.Controller = {

        show: function(){

            if (Header.Controller.region) {

                this.room = Backbone.Radio.request("app:data", "room");
                this.room.set("edit_mode", false);

                this.headerView = new Header.HeaderView({model: this.room});

                this.headerView.on("rooms:edit-mode", function(){
                    Header.Controller.room.set("edit_mode", true);
                    Header.Controller.headerView.render();
                });

                this.headerView.on("rooms:cancel-update", function(){
                    Header.Controller.room.set("edit_mode", false);
                    Header.Controller.headerView.render();
                });

                this.headerView.on("rooms:update-room", function(){
                    Header.Controller.room.set("title", $(".input-room-name").val());

                    var save_promise = Header.Controller.room.save();
                    if (save_promise) {
                        $.when(save_promise).done(Header.Controller.completeUpdateRoom);
                        $.when(save_promise).fail(function (room_data) {
                            Header.Controller.headerView.showFailedUpdateRoomMessage();
                        });
                    } else {
                        Header.Controller.headerView.showFailedUpdateRoomMessage();
                    }
                });


                Header.Controller.region.show(this.headerView);
            }
        },

        completeUpdateRoom: function(){
            Header.Controller.room.set("edit_mode", false);
            Header.Controller.headerView.render();
        }
    }
});
