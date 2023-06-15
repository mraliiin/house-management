HousePad.TradeApp.module("Index", function(Index, TradeApp, Backbone, Marionette, $, _){

    Index.Controller = {

        show: function(){
            this.layout = new Index.IndexLayout();
            TradeApp.Layout.getRegion("main_panel").show(this.layout);

            TradeApp.module("Homes.List").start({region: this.layout.getRegion("homes")});

            //this.houses = Backbone.Radio.request("app:data", "houses");
            //this.indexView = new Index.IndexView({collection: this.houses});

            //this.layout.getRegion("homes").show(this.indexView);
        }
    }
});
