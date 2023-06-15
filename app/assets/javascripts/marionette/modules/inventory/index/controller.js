HousePad.TradeApp.module("Inventory.Index", function(Index, TradeApp, Backbone, Marionette, $, _){

    Index.Controller = {
        show: function(){

            this.layout = new Index.IndexLayout();
            TradeApp.Layout.getRegion("main_panel").show(this.layout);

            //(re)Start Inventory Filters module
            TradeApp.module("Inventory.Index.Filters").stop();
            TradeApp.module("Inventory.Index.Filters").start({region: this.layout.getRegion("inventory_filters")});

            //(re)Start the Inventory Items module
            TradeApp.module("Inventory.Index.Items").stop();
            TradeApp.module("Inventory.Index.Items").start({region: this.layout.getRegion("inventory_items")});

            // Breadcrumbs data
            this.inventory_breadcrumb_data = Backbone.Radio.request("app:data", "filters")
                .get("inventory_breadcrumb_data");

            this.breadcrumbsView = new Index.BreadcrumbsView({ collection: this.inventory_breadcrumb_data });
            this.layout.getRegion("inventory_breadcrumbs").show(this.breadcrumbsView);
        }
    }
});
