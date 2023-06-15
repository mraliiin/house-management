HousePad.TradeApp.module("Inventory.Item.Show", function(Show, TradeApp, Backbone, Marionette, $, _){

    Show.Controller = {

        show: function(){

            this.layout = new Show.ShowLayout();
            TradeApp.Layout.getRegion("main_panel").show(this.layout);

            this.inventory_item = Backbone.Radio.request("app:data", "inventory_item");

            this.itemTitleView = new Show.ItemTitleView({model: this.inventory_item});
            this.layout.getRegion("item_title").show(this.itemTitleView);

            this.itemTitleView.on("item:edit", function () {
                HousePad.TradeApp.module("Inventory.Item.Edit").start();
            });

            //(re)Start Item images module
            TradeApp.module("Inventory.Item.Show.Images").stop();
            TradeApp.module("Inventory.Item.Show.Images").start({region: this.layout.getRegion("item_images")});
            $("#page-overlay").hide();
        }
    }
});
