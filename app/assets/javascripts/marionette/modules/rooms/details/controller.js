HousePad.TradeApp.module("Rooms.Details", function (Details, TradeApp, Backbone, Marionette, $, _) {

    Details.Controller = {

        show: function () {
            this.layout = new Details.DetailsLayout();
            TradeApp.Layout.getRegion("main_panel").show(this.layout);

            this.room = Backbone.Radio.request("app:data", "room");

            this.room.set("description_edit_mode", false);
            this.detailsView = new Details.DetailsView({model: this.room});

            // Breadcrumbs data
            this.clients_with_house_data = this.room.get("clients_with_house_data");
            this.breadcrumbsView = new Details.BreadcrumbsView({collection: this.clients_with_house_data});
            this.layout.getRegion("breadcrumbs").show(this.breadcrumbsView);

            this.detailsView.on("rooms:edit-mode-description", function () {
                Details.Controller.room.set("description_edit_mode", true);
                Details.Controller.detailsView.render();
            });

            this.detailsView.on("rooms:cancel-update-description", function () {
                Details.Controller.room.set("description_edit_mode", false);
                Details.Controller.detailsView.render();
            });

            this.detailsView.on("rooms:update-room-description", function () {
                Details.Controller.room.set("description", $(".input-room-description").val());

                var save_promise = Details.Controller.room.save();
                if (save_promise) {
                    $.when(save_promise).done(Details.Controller.completeUpdateRoomDescription);
                    $.when(save_promise).fail(function (room_data) {
                        Details.Controller.detailsView.showFailedUpdateRoomDescriptionMessage();
                    });
                } else {
                    Details.Controller.detailsView.showFailedUpdateRoomDescriptionMessage();
                }
            });

            this.layout.getRegion("room_details").show(this.detailsView);

            //(re)Start Room title module
            TradeApp.module("Rooms.Header").stop();
            TradeApp.module("Rooms.Header").start({region: this.layout.getRegion("room_header")});
        },

        completeUpdateRoomDescription: function () {
            Details.Controller.room.set("description_edit_mode", false);
            Details.Controller.detailsView.render();
        },

        reloadRoom: function () {
            var room = Backbone.Radio.request("app:data", "room");
            var fetch_promise = room.fetch();

            if (fetch_promise) {
                $.when(fetch_promise).done(function () {
                    Backbone.Radio.command("app:data", "set_room", room);
                    Details.Controller.show();
                });
            }
        }

    }
});
