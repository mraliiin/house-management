HousePad.TradeApp.module("Inventory.Item.Edit.Conditions.Add", function (Add, TradeApp, Backbone, Marionette, $, _) {

    Add.AddConditionsView = Marionette.ItemView.extend({
        template: "#item-add-conditions-template",
        tagName: "div",
        className: "col-xs-12",

        ui: {
            select_condition: ".select-condition",
            save_condition: "#save-condition"
        },

        triggers: {
            "click @ui.save_condition": "save-current-condition"
        },

        events: {
            "click @ui.select_condition": "itemSelected"
        },

        itemSelected: function (e) {
            e.stopPropagation();

            Add.Controller.addConditionsView.hideFeedback();

            var id = parseInt($(e.currentTarget).data("id"));
            var level = parseInt($(e.currentTarget).data("level"));

            var conditions = Backbone.Radio.request("app:data", "conditions");

            // Delete all selected conditions after level
            var selected_conditions = conditions.get("selected_conditions");
            selected_conditions.splice(level, 100);

            // Find the currently selected condition
            var selected_item = null;
            if (level == 0) {
                selected_item = HousePad.Utils.getArrayElement(conditions.get("conditions"), id);
            } else {
                selected_item = HousePad.Utils.getArrayElement(selected_conditions[level - 1].descendants, id);
            }

            // We only save one condition per item
            if (selected_item != null) {
                selected_conditions[0] = selected_item;
            }

            // Refresh
            Add.Controller.show();
        },

        showErrorFeedback: function (message) {
            $("#item-add-conditions-feedback").html(message);
            $("#item-add-conditions-feedback").addClass("alert-danger");
            $("#item-add-conditions-feedback").removeClass("alert-success");
            $("#item-add-conditions-feedback").show();
        },

        showSuccessFeedback: function (message) {
            $("#item-add-conditions-feedback").html(message);
            $("#item-add-conditions-feedback").addClass("alert-success");
            $("#item-add-conditions-feedback").removeClass("alert-danger");
            $("#item-add-conditions-feedback").show();
        },

        hideFeedback: function () {
            $("#item-add-conditions-feedback").hide();
        }
    });
});