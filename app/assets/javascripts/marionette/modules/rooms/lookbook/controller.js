HousePad.TradeApp.module("Rooms.Lookbook", function(Lookbook, TradeApp, Backbone, Marionette, $, _){

    Lookbook.Controller = {
        show: function(){
            this.layout = new Lookbook.LookbookLayout();
            TradeApp.Layout.getRegion("main_panel").show(this.layout);

            this.room = Backbone.Radio.request("app:data", "room");
            this.room.exit_delete_mode();
            this.lookbookView = new Lookbook.LookbookView({model: this.room});

            // Breadcrumbs data
            this.clients_with_house_data = this.room.get("clients_with_house_data");
            this.breadcrumbsView = new Lookbook.BreadcrumbsView({ collection: this.clients_with_house_data });
            this.layout.getRegion("breadcrumbs").show(this.breadcrumbsView);

            this.lookbookView.on("rooms:delete-mode", function(){
                if (Lookbook.Controller.room.get("delete_mode") == true){
                    Lookbook.Controller.room.exit_delete_mode();
                    $(".btn-delete-mode").html("Edit");
                    //restart images list module
                    HousePad.TradeApp.module("Rooms.Images.List").stop();
                    HousePad.TradeApp.module("Rooms.Images.List").start({region: Lookbook.Controller.layout.getRegion("images")});
                } else {
                    Lookbook.Controller.room.enter_delete_mode();
                    $(".btn-delete-mode").html("Done");
                    //restart images list module
                    HousePad.TradeApp.module("Rooms.Images.List").stop();
                    HousePad.TradeApp.module("Rooms.Images.List").start({region: Lookbook.Controller.layout.getRegion("images")});
                }
            });

            this.lookbookView.on("room:del-image", function(image_id){

                var roomImage = Lookbook.Controller.room.get("snapshots").get(image_id);

                var save_promise = roomImage.destroy();
                if (save_promise) {
                    $.when(save_promise).done(Lookbook.Controller.reloadRoom);
                    $.when(save_promise).fail(function (room_data) {
                        //Lookbook.Controller.showView.showFailedDeleteImageMessage();
                    });
                } else {
                    //Lookbook.Controller.showView.showFailedDeleteImageMessage();
                }
            });

            this.layout.getRegion("room_lookbook").show(this.lookbookView);

            //(re)Start Room title module
            TradeApp.module("Rooms.Header").stop();
            TradeApp.module("Rooms.Header").start({region: this.layout.getRegion("room_header")});

            //(re)Start images list module
            TradeApp.module("Rooms.Images.List").stop();
            TradeApp.module("Rooms.Images.List").start({region: this.layout.getRegion("images")});
        },

        reloadRoom: function(){
            var room = Backbone.Radio.request("app:data", "room");
            var fetch_promise = room.fetch();

            if (fetch_promise) {
                $.when(fetch_promise).done(function(){
                    //Set snapshots collection
                    var Models = TradeApp.module("Models");
                    room.set("snapshots", new Models.RoomImages(room.get("snapshots")));
                    _.each(room.get("snapshots").models, function(snapshot){
                        var snapshot_notes = new Models.RoomImageNotes(snapshot.get("snapshot_notes"));
                        snapshot.set("snapshot_notes", snapshot_notes);
                    });
                    Backbone.Radio.command("app:data", "set_room", room);
                    Lookbook.Controller.show();
                });
            }
        }
    }
});
