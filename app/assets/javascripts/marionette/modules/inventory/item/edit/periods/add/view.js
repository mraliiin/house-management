HousePad.TradeApp.module("Inventory.Item.Edit.Periods.Add", function (Add, TradeApp, Backbone, Marionette, $, _) {

    Add.AddPeriodsView = Marionette.ItemView.extend({
        template: "#item-add-periods-template",
        tagName: "div",
        className: "col-xs-12",

        ui: {
            select_period: ".select-period",
            save_period: "#save-period"
        },

        triggers: {
            "click @ui.save_period": "save-current-period"
        },

        events: {
            "click @ui.select_period": "itemSelected"
        },

        itemSelected: function (e) {
            e.stopPropagation();

            Add.Controller.addPeriodsView.hideFeedback();

            var id = parseInt($(e.currentTarget).data("id"));
            var level = parseInt($(e.currentTarget).data("level"));

            var periods = Backbone.Radio.request("app:data", "periods");

            // Delete all selected periods after level
            var selected_periods = periods.get("selected_periods");
            selected_periods.splice(level, 100);

            // Find the currently selected period
            var selected_item = null;
            if (level == 0) {
                selected_item = HousePad.Utils.getArrayElement(periods.get("periods"), id);
            } else {
                selected_item = HousePad.Utils.getArrayElement(selected_periods[level - 1].descendants, id);
            }

            // We only save one period per item
            if (selected_item != null) {
                selected_periods[0] = selected_item;
            }

            // Refresh
            Add.Controller.show();
        },

        showErrorFeedback: function (message) {
            $("#item-add-periods-feedback").html(message);
            $("#item-add-periods-feedback").addClass("alert-danger");
            $("#item-add-periods-feedback").removeClass("alert-success");
            $("#item-add-periods-feedback").show();
        },

        showSuccessFeedback: function (message) {
            $("#item-add-periods-feedback").html(message);
            $("#item-add-periods-feedback").addClass("alert-success");
            $("#item-add-periods-feedback").removeClass("alert-danger");
            $("#item-add-periods-feedback").show();
        },

        hideFeedback: function () {
            $("#item-add-periods-feedback").hide();
        }
    });
});