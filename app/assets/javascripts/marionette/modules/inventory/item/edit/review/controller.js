HousePad.TradeApp.module("Inventory.Item.Edit.Review", function (Review, TradeApp, Backbone, Marionette, $, _) {

    Review.Controller = {
        show: function () {
            this.inventory_item = Backbone.Radio.request("app:data", "inventory_item");

            this.itemView = new Review.ItemView({model: this.inventory_item});

            this.itemView.on("item:save-review", function () {
                HousePad.TradeApp.module("Inventory.Item.Edit").stop();
                HousePad.TradeApp.module("Inventory.Item.Edit").start();
                Backbone.Radio.command("inventory-item", "save-item");
            });

            this.itemView.on("item:cancel-review", function () {
                HousePad.TradeApp.module("Inventory.Item.Edit").stop();
                HousePad.TradeApp.module("Inventory.Item.Edit").start();
            });

            TradeApp.Layout.getRegion("main_panel").show(this.itemView);
        }
    }
});
