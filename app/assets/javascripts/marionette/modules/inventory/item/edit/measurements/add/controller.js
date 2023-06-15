HousePad.TradeApp.module("Inventory.Item.Edit.Measurements.Add", function (Add, TradeApp, Backbone, Marionette, $, _) {
    Add.Controller = {
        show: function () {
            if (Add.Controller.region) {

                this.layout = new Add.Layout();
                Add.Controller.region.show(this.layout);

                this.measurements = Backbone.Radio.request("app:data", "measurements");

                this.addMeasurementsView = new Add.AddMeasurementsView({model: this.measurements});
                this.layout.getRegion("add_measurements").show(this.addMeasurementsView);

                // Refresh all units when changing the system of measurement changes
                this.addMeasurementsView.on("measurements:system_changed", function () {
                    Add.Controller.reloadMeasurements(false);
                });

                // Load the extra measurements container
                this.showExtra(this.measurements);
            }
        },

        showExtra: function(measurements) {
            this.addExtraMeasurementsView = new Add.AddExtraMeasurementsView({model: measurements});
            this.layout.getRegion("add_extra_measurements").show(this.addExtraMeasurementsView);

            // Refresh just the extra section
            this.addExtraMeasurementsView.on("measurements:dimension_changed", function () {
                Add.Controller.reloadMeasurements(true);
            });
        },

        reloadMeasurements: function(isExtra) {
            var measurements = Add.Controller.measurements;
            var unit_type_id = $("#unit_type_id").val();
            var system_type = $("#system_id").val().toLowerCase();

            // Get selected measurement type (length, volume, etc)
            var unit_types = measurements.get('measurements').unit_types;
            var selected_unit_type = unit_types.filter(function (c) {
                return unit_type_id == c['id'];
            })[0];

            // We'll use it to load the appropriate units
            if (selected_unit_type != undefined) {
                measurements.attributes.measurements.selected_unit_type = selected_unit_type;
            }

            measurements.attributes.measurements.system_type = system_type;
            Backbone.Radio.command("app:data", "set_measurements", measurements);

            // Reload the proper section
            if(isExtra) {
                Add.Controller.showExtra(measurements);
            } else {
                Add.Controller.show();
            }
        },

        saveMeasurements: function(form) {
            var new_measurement = Add.Controller.buildMeasurementModel(form);

            var dimension_type_id = new_measurement.dimension_type_id;
            if(dimension_type_id == undefined || dimension_type_id == '') {
                Add.Controller.addMeasurementsView.showErrorFeedback("Dimension type is required!");
                return;
            }

            var current_measurements = Add.Controller.measurements.get("current_measurements") || [];

            // Check for duplicates and skip dimension types (length, height) that we want to update
            var diffs = current_measurements.filter(function (c) {
                // If it has ID must be an update so we must keep it
                if (dimension_type_id == c['dimension_type_id'] && c['id']) new_measurement.id = c.id;

                return dimension_type_id != c['dimension_type_id'];
            });

            diffs.push(new_measurement);

            Add.Controller.measurements.set("current_measurements", diffs);
            Backbone.Radio.command("app:data", "set_measurements", Add.Controller.measurements);
            Backbone.Radio.command("inventory-measurements", "reload:measurements-list");
        },

        buildMeasurementModel : function(form){
            var new_measurement = {};
            form.serializeArray().map(function(p){
                new_measurement[p.name] = p.value;
            });

            new_measurement.isDeleted = false;
            new_measurement.unit_name = form.find('select[name="unit_id"] option:selected').text();
            new_measurement.fraction_name = form.find('select[name="fraction_id"] option:selected').text();

            // The default measurements already have the dimension name
            if(!new_measurement.dimension_type_name) {
                new_measurement.dimension_type_name = form.find('select[name="dimension_type_id"] option:selected').text();
            }

            return new_measurement;
        },

        isValidNumber: function(value) {
            if(!value) return false;

            if(isNaN(value)) {
                Add.Controller.addMeasurementsView.showErrorFeedback("Value must be numeric");
                return false;
            }

            Add.Controller.addMeasurementsView.hideFeedback();
            return true;
        }
    }
});
