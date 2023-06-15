HousePad.TradeApp.module("Clients.Homes.List", function(List, TradeApp, Backbone, Marionette, $, _){

    List.Controller = {

        show: function(){

            if (List.Controller.region) {
                this.delete_mode = false;

                var trade_client = Backbone.Radio.request("app:data", "trade_client");
                this.houses = trade_client.get("trade_client").houses;
                this.houses.exit_delete_mode();
                this.listView = new List.ListView({collection: this.houses});


                this.listView.on("homes:add-home", function(){
                    $('#clients-modal').modal("toggle");
                    TradeApp.module("Clients.Homes.NewHome").start();
                });

                this.listView.on("homes:delete-mode", function(){
                    if (List.Controller.delete_mode == true){
                        List.Controller.delete_mode = false;
                        List.Controller.houses.exit_delete_mode();
                        this.render();
                        $(".btn-delete-mode").html("Edit");
                    } else {
                        List.Controller.delete_mode = true;
                        List.Controller.houses.enter_edit_mode();
                        this.render();
                        $(".btn-delete-mode").html("Done");
                    }
                });

                this.listView.on("home:delete", function(home_id){

                    var house = this.collection.get(home_id);
                    var delete_promise = house.destroy();
                    if (delete_promise){
                        $.when(delete_promise).done(function(){
                            List.Controller.houses.remove(house, {silent: true});
                            List.Controller.listView.render();
                        });
                        $.when(delete_promise).fail(function(){
                            this.showErrorFeedback("Failed to delete home.");
                        });
                    } else {
                        this.showErrorFeedback("Failed to delete home.");
                    }
                });

                List.Controller.region.show(this.listView);
            }
        },


        reloadHomes: function(){
            var trade_client = Backbone.Radio.request("app:data", "trade_client");

            var houses = Backbone.Radio.request("models:houses", "new", trade_client.get("trade_client").id);
            var fetch_promise = houses.fetch();

            if (fetch_promise) {
                $.when(fetch_promise).done(function(){
                    trade_client.get("trade_client").houses = houses;
                    Backbone.Radio.command("app:data", "set_trade_client", trade_client);
                    List.Controller.show();
                });
            }
        }

    }
});
