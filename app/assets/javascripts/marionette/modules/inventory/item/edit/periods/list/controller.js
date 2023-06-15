HousePad.TradeApp.module('Inventory.Item.Edit.Periods.List', function (List, TradeApp, Backbone, Marionette, $, _) {

    List.Controller = {
        show: function () {
            if (List.Controller.region) {

                this.inventory_item = Backbone.Radio.request("app:data", "inventory_item");

                this.periods = this.inventory_item.get("inventory_periods");

                this.periodsListView = new List.PeriodListView({ collection: this.periods });

                List.Controller.region.show(this.periodsListView);
            }
        },

        delete: function () {
            if (!confirm("Are you sure?")) return;

            // We only have one period
            var Models = HousePad.TradeApp.module("Models");
            List.Controller.inventory_item.set("inventory_periods", new Models.InventoryPeriods());

            // Refresh selected periods container
            Backbone.Radio.command("inventory-periods", "reload:periods-list");
        },

        reload: function () {
            var url = "/trade/inventory-items/" + List.Controller.inventory_item.id + "/periods";

            var load_promise = $.get(url, {
                token: List.Controller.inventory_item.get("token")
            });

            if (load_promise) {
                $.when(load_promise).done(function (item_periods) {
                    var Models = TradeApp.module("Models");

                    List.Controller.inventory_item.set("inventory_periods",
                        new Models.InventoryPeriods(item_periods));

                    List.Controller.show();
                });

                $.when(load_promise).fail(function () {});
            }
        }
    }
});
