HousePad.TradeApp.module('Inventory.Item.Edit.Conditions.List', function (List, TradeApp, Backbone, Marionette, $, _) {

    List.Controller = {
        show: function () {
            if (List.Controller.region) {

                this.inventory_item = Backbone.Radio.request("app:data", "inventory_item");

                this.conditions = this.inventory_item.get("inventory_conditions");

                this.conditionsListView = new List.ConditionListView({ collection: this.conditions });

                List.Controller.region.show(this.conditionsListView);
            }
        },

        delete: function () {
            if (!confirm("Are you sure?")) return;

            // We only have one condition so it's pretty str8 forward
            var Models = HousePad.TradeApp.module("Models");
            List.Controller.inventory_item.set("inventory_conditions", new Models.InventoryConditions());

            // Refresh selected conditions container
            Backbone.Radio.command("inventory-conditions", "reload:conditions-list");
        },

        reload: function () {
            var url = "/trade/inventory-items/" + List.Controller.inventory_item.id + "/conditions";

            var load_promise = $.get(url, {
                token: List.Controller.inventory_item.get("token")
            });

            if (load_promise) {
                $.when(load_promise).done(function (item_conditions) {
                    var Models = TradeApp.module("Models");

                    List.Controller.inventory_item.set("inventory_conditions",
                        new Models.InventoryConditions(item_conditions));

                    List.Controller.show();
                });

                $.when(load_promise).fail(function () {});
            }
        }
    }
});
