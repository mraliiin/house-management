HousePad.TradeApp.module('Inventory.Item.Edit.Measurements.List', function (List, TradeApp, Backbone, Marionette, $, _) {

    List.Controller = {
        show: function () {
            if (List.Controller.region) {

                this.inventory_item = Backbone.Radio.request("app:data", "inventory_item");

                this.measurements = Backbone.Radio.request("app:data", "measurements");

                this.measurementsListView = new List.ConditionListView({ collection: this.measurements });

                List.Controller.region.show(this.measurementsListView);
            }
        },

        deleteMeasurement: function(id){
            if (!confirm("Are you sure?")) return;

            var current_measurements = List.Controller.measurements.get("current_measurements") || [];

            // Select all dimension different from the deleted one
            var diffs = current_measurements.filter(function (c) {
                // Old dimensions we just mark as deleted to remove them later form the DB
                if (id == c['dimension_type_id'] && c['id']) {
                    c.isDeleted = true;
                    return true;
                }

                return id != c['dimension_type_id'];
            });

            List.Controller.measurements.set("current_measurements", diffs);
            Backbone.Radio.command("app:data", "set_measurements", List.Controller.measurements);
            Backbone.Radio.command("inventory-measurements", "reload:measurements-list");
        },
    }
});
