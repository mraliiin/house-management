HousePad.TradeApp.module("Homes.Show", function(Show, TradeApp, Backbone, Marionette, $, _){

    Show.Controller = {

        show: function(){
            this.layout = new Show.ShowHomeLayout();
            TradeApp.Layout.getRegion("main_panel").show(this.layout);

            this.house = Backbone.Radio.request("app:data", "house");
            this.house.set("edit_mode", false);
            //this.house.exit_delete_mode();

            this.rooms = this.house.get("rooms");
            this.homeView = new Show.ShowHomeView({model: this.house});

            // Breadcrumbs data
            this.clients_with_house_data = this.house.get("clients_with_house_data");
            this.breadcrumbsView = new Show.BreadcrumbsView({ collection: this.clients_with_house_data });

            this.homeView.on("homes:add-room", function(){
                Backbone.Radio.command("rooms", "rooms:add-room");
            });

            this.homeView.on("homes:lower-temp", function(){
                Show.Controller.lower_temperature();
            });

            this.homeView.on("homes:increase-temp", function(){
                Show.Controller.increase_temperature();
            });

            this.homeView.on("homes:edit-mode", function(){
                Show.Controller.house.set("edit_mode", true);
                Show.Controller.homeView.render();
            });

            this.homeView.on("homes:cancel-update", function(){
                Show.Controller.house.set("edit_mode", false);
                Show.Controller.homeView.render();
            });

            this.homeView.on("homes:update-home", function(){
                Show.Controller.house.set("name", $(".input-home-name").val());

                var save_promise = Show.Controller.house.save();
                if (save_promise) {
                    $.when(save_promise).done(Show.Controller.completeUpdateHome);
                    $.when(save_promise).fail(function (room_data) {
                        Show.Controller.homeView.showFailedUpdateHomeMessage();
                    });
                } else {
                    Show.Controller.homeView.showFailedUpdateHomeMessage();
                }
            });

            this.layout.getRegion("show_home").show(this.homeView);

            // Start rooms list module
            TradeApp.module("Homes.Rooms.List").start({region: this.layout.getRegion("rooms")});

            this.layout.getRegion("breadcrumbs").show(this.breadcrumbsView);

            //this.hook_thermostat_updates();
        },

        markProjectAsCompleted: function(){
             if (!confirm("Are you sure?")) {
             return;
             }

            var house = Backbone.Radio.request("app:data", "house");
            var project_id =  house.get('id');
            var save_promise = $.post("/trade/homes/" + project_id,
            {
                home: {
                    trade_client_completed: 'true',
                    name: house.get('name')
                }
            });

            if (save_promise) {
                $.when(save_promise).done(function () {
                    $("button[data-id='"+ project_id +"']").hide();
                });
            } else {
                this.showInvalidFormMessage();
            }
        },

        completeUpdateHome: function() {
            Show.Controller.house.set("edit_mode", false);
            Show.Controller.homeView.render();
        }
    }
});
