HousePad.TradeApp.module("Homes.List", function(List, TradeApp, Backbone, Marionette, $, _){

    List.Controller = {

        show: function(){

            this.houses = Backbone.Radio.request("app:data", "houses");
            this.listView = new List.ListView({collection: this.houses});

            TradeApp.Layout.getRegion("main_panel").show(this.listView);
        }
    }
});
