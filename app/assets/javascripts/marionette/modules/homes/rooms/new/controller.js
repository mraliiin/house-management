HousePad.TradeApp.module("Homes.Rooms.New", function(New, TradeApp, Backbone, Marionette, $, _){

    New.Controller = {

        show: function(){
            this.house = Backbone.Radio.request("app:data", "house");
            var clients_with_house_data = this.house.get("clients_with_house_data");

            var newRoomView = new New.NewRoomView({ collection: clients_with_house_data });

            // Refresh homes list on client_changed event
            newRoomView.on("new-room:client_changed", function(){
                newRoomView.showProgress();
                var data = Backbone.Syphon.serialize(this);

                // Get selected client
                var clients = clients_with_house_data.attributes.other_clients;
                var selected_client = clients.filter(function(c){
                    return data['client_id'] == c['id'];
                })[0];

                // Update view collection to load his homes in the second list
                if(selected_client != undefined) {
                    clients_with_house_data.attributes.selected_client = selected_client;
                    newRoomView.collection.set(new Backbone.Collection(clients_with_house_data));
                    New.Controller.show();
                }
;
                newRoomView.hideProgress();
            });

            // Save new room
            newRoomView.on("new-room:save", function(){
                newRoomView.showProgress();
                var room_data = Backbone.Syphon.serialize(this);

                if (New.Controller.hasInvalidData(room_data)) {
                    newRoomView.hideProgress();
                    newRoomView.showFailedSaveMessage(room_data);
                    return;
                }

                var house_id = room_data['house_id'];
                var house = Backbone.Radio.request("app:data", "house");

                var save_promise = $.post("/trade/homes/" + house_id + "/create_room", {room: room_data});
                if (save_promise) {
                    $.when(save_promise).done(New.Controller.completeSaveNewRoom);
                    $.when(save_promise).fail(function (room_data) {
                        newRoomView.hideProgress();
                        newRoomView.showFailedSaveMessage(room_data);
                    });
                } else {
                    newRoomView.hideProgress();
                    this.showInvalidFormMessage();
                }
            });

            $('#new-room-modal').modal({});
            TradeApp.new_room.show(newRoomView);
        },

        completeSaveNewRoom: function(){
            $('#new-room-modal').modal("hide");
            Backbone.Radio.command("rooms", "reload");
            TradeApp.module("Homes.Rooms.New").stop();
        },

        hasInvalidData: function(room_data){
          return room_data['house_id'] === undefined || room_data['house_id'] === ''
            || room_data['title'] === undefined || room_data['title'] === '';
        },
    }
});
