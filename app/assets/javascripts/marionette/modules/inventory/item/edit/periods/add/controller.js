HousePad.TradeApp.module("Inventory.Item.Edit.Periods.Add", function (Add, TradeApp, Backbone, Marionette, $, _) {

    Add.Controller = {
        show: function () {
            if (Add.Controller.region) {
                this.inventory_item = Backbone.Radio.request("app:data", "inventory_item");

                this.periods = Backbone.Radio.request("app:data", "periods");

                this.addPeriodsView = new Add.AddPeriodsView({model: this.periods});

                // Save period
                this.addPeriodsView.on("save-current-period", function () {
                    if (Add.Controller.periods.get("selected_periods").length > 0) {

                        var Models = HousePad.TradeApp.module("Models");
                        var selected_periods = new Models.InventoryPeriods(
                            Add.Controller.periods.get("selected_periods")
                        );

                        // Set selected periods on client_side and update
                        Add.Controller.inventory_item.set("inventory_periods", selected_periods);
                        Backbone.Radio.command("app:data", "set_inventory_item", Add.Controller.inventory_item);

                        // Refresh selected periods container
                        Backbone.Radio.command("inventory-periods", "reload:periods-list");
                    }
                });

                Add.Controller.region.show(this.addPeriodsView);
            }
        },

        onCompleteSave: function () {
            Add.Controller.addPeriodsView.showSuccessFeedback("Period saved.");

            // Refresh periods container
            Backbone.Radio.command("inventory-periods", "reload:items");

            // Cleanup selected periods and redraw
            Add.Controller.periods.set("selected_periods", new Array());
            Add.Controller.show();
        }
    }
});
