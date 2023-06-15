HousePad.TradeApp.module("Inventory.Item.Edit.Measurements.Add", function (Add, TradeApp, Backbone, Marionette, $, _) {

    Add.AddMeasurementsView = Marionette.ItemView.extend({
        template: "#item-add-default-measurements-template",
        tagName: "div",
        className: "col-xs-12",

        ui: {},

        triggers: {
            "change #system_id": "measurements:system_changed",
        },

        events: {
            "blur input[name='dimension_value']": 'save_measurement',
            "change select[name='unit_id']": 'save_measurement',
            "change select[name='fraction_id']": 'save_measurement',
        },

        save_measurement: function (e) {
            var element = $(e.currentTarget);
            var form = element.closest('form');

            var measurement = Add.Controller.buildMeasurementModel(form);
            if (measurement.unit_id && Add.Controller.isValidNumber(measurement.dimension_value)) {
                Backbone.Radio.command("inventory-measurements", "save-current-measurement", form);

            // Remove empty inputs
            } else if (element.attr("name") == 'dimension_value' && !measurement.dimension_value) {
                Backbone.Radio.command("inventory-measurements", "delete:item", measurement.dimension_type_id);
            }

            return false;
        },

        showErrorFeedback: function (message) {
            $("#item-add-measurements-feedback").html(message);
            $("#item-add-measurements-feedback").addClass("alert-danger");
            $("#item-add-measurements-feedback").removeClass("alert-success");
            $("#item-add-measurements-feedback").show();
        },

        showSuccessFeedback: function (message) {
            $("#item-add-measurements-feedback").html(message);
            $("#item-add-measurements-feedback").addClass("alert-success");
            $("#item-add-measurements-feedback").removeClass("alert-danger");
            $("#item-add-measurements-feedback").show();
        },

        hideFeedback: function () {
            $("#item-add-measurements-feedback").hide();
        },
    });

    Add.AddExtraMeasurementsView = Marionette.ItemView.extend({
        template: "#item-add-extra-measurements-template",
        tagName: "div",
        className: "col-xs-12",

        ui: {},

        triggers: {
            "change #unit_type_id": "measurements:dimension_changed",
        },

        events: {
            "click #save-measurement": function () {
                var form = $("form[name='extra_dimensions_form']");
                Backbone.Radio.command("inventory-measurements", "save-current-measurement", form);
                return false;
            },

            "keyup #dimension_value": function () {
                var value = $('#dimension_value').val();
                var disabled =
                    !Add.Controller.isValidNumber(value)
                    || !$("#unit_id option:selected").length
                    || !$("#dimension_type_id option:selected").length;

                $("#save-measurement").prop('disabled', disabled);
            }
        },
    });
});