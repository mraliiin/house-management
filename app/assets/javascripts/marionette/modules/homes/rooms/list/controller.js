HousePad.TradeApp.module("Homes.Rooms.List", function(List, TradeApp, Backbone, Marionette, $, _){

    List.Controller = {

        show: function(){

            if (List.Controller.region) {

                this.house = Backbone.Radio.request("app:data", "house");
                List.Controller.house.exit_delete_mode();
                this.rooms = this.house.get("rooms");
                this.listView = new List.ListView({collection: this.rooms});

                this.listView.on("rooms:add-room", this.loadNewRoomDialog);

                this.listView.on("rooms:delete-mode", function(){
                    if (List.Controller.house.get("delete_mode") == true){
                        List.Controller.house.exit_delete_mode();
                        //$(".btn-delete-mode").html("Edit");
                        List.Controller.listView.render();
                        ////restart rooms list module
                        //TradeApp.module("Homes.Rooms.List").stop();
                        //TradeApp.module("Homes.Rooms.List").start({region: Show.Controller.layout.getRegion("rooms")});
                    } else {
                        List.Controller.house.enter_delete_mode();
                        //$(".btn-delete-mode").html("Done");
                        List.Controller.listView.render();
                        ////restart rooms list module
                        //TradeApp.module("Homes.Rooms.List").stop();
                        //TradeApp.module("Homes.Rooms.List").start({region: Show.Controller.layout.getRegion("rooms")});
                    }
                });

                this.listView.on("rooms:delete", function(room_id){
                    var room = this.collection.get(room_id);
                    var delete_promise = room.destroy();
                    if (delete_promise){
                        $.when(delete_promise).done(function(){
                            List.Controller.listView.showSuccessfulDeleteMessage();
                            List.Controller.rooms.remove(room, {silent: true});
                            List.Controller.show();
                        });
                        $.when(delete_promise).fail(function(){
                            List.Controller.listView.showErrorFeedback("Failed to delete room.");
                        });
                    } else {
                        List.Controller.listView.showErrorFeedback("Failed to delete room.");
                    }
                });

                List.Controller.region.show(this.listView);
            }

            Backbone.Radio.on("rooms", "reorder", function(){
                var room_ids = new Array();
                $(".room-container").map(function(idx, room){
                    room_ids.push($(room).data("id"));
                });

                var save_promise = $.post("/trade/homes/"+List.Controller.house.id+"/reorder_rooms", {room_ids: room_ids});
                if (save_promise) {
                    $.when(save_promise).done(List.Controller.completeReorderRooms);
                    $.when(save_promise).fail(function () {
                        List.Controller.listView.render();
                    });
                } else {
                    List.Controller.listView.render();
                }
            });
        },

        loadNewRoomDialog : function(){
            //Start Clients New Room module
            $('#new-room-modal').modal('show');
            TradeApp.module("Homes.Rooms.New").start();
        },

        completeReorderRooms: function(){
            var room_ids = new Array();
            $(".room-container").map(function(idx, room){
                room_ids.push($(room).data("id"));
            });

            //Make sure the snapshot models are in the order of image ids
            for (var i=0; i<room_ids.length; i++){
                var room_id = room_ids[i];
                var room = List.Controller.rooms.get(room_id);
                List.Controller.rooms.remove(room);
                List.Controller.rooms.add(room, {at: i});
            }
        },


        reloadRooms: function(){
            var house = Backbone.Radio.request("app:data", "house");

            var rooms = Backbone.Radio.request("models:rooms", "new", house.id);
            var fetch_promise = rooms.fetch();

            if (fetch_promise) {
                $.when(fetch_promise).done(function(){
                    house.set("rooms", rooms);
                    Backbone.Radio.command("app:data", "set_house", house);
                    List.Controller.show();
                });
            }
        }

    }
});
