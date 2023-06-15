HousePad.TradeApp.module("Inventory.Item.Edit.Conditions.Add", function (Add, TradeApp, Backbone, Marionette, $, _) {

    Add.Controller = {
        show: function () {
            if (Add.Controller.region) {
                this.inventory_item = Backbone.Radio.request("app:data", "inventory_item");

                this.conditions = Backbone.Radio.request("app:data", "conditions");

                this.addConditionsView = new Add.AddConditionsView({model: this.conditions});

                // Save condition
                this.addConditionsView.on("save-current-condition", function () {
                    if (Add.Controller.conditions.get("selected_conditions").length > 0) {

                        var Models = HousePad.TradeApp.module("Models");
                        var selected_conditions = new Models.InventoryConditions(
                            Add.Controller.conditions.get("selected_conditions")
                        );

                        // Set selected conditions on client_side and update
                        Add.Controller.inventory_item.set("inventory_conditions", selected_conditions);
                        Backbone.Radio.command("app:data", "set_inventory_item", Add.Controller.inventory_item);

                        // Refresh selected conditions container
                        Backbone.Radio.command("inventory-conditions", "reload:conditions-list");
                    }
                });

                Add.Controller.region.show(this.addConditionsView);
            }
        },

        onCompleteSave: function () {
            Add.Controller.addConditionsView.showSuccessFeedback("Condition saved.");

            // Refresh conditions container
            Backbone.Radio.command("inventory-conditions", "reload:items");

            // Cleanup selected conditions and redraw
            Add.Controller.conditions.set("selected_conditions", new Array());
            Add.Controller.show();
        }
    }
});
