HousePad.TradeApp.module("Inventory.Item.Edit.Materials.Add", function (Add, TradeApp, Backbone, Marionette, $, _) {

    Add.AddMaterialsView = Marionette.ItemView.extend({
        template: "#item-add-materials-template",
        tagName: "div",
        className: "col-xs-12",

        ui: {
            select_material: ".select-material",
            save_material: "#save-material"
        },

        triggers: {
            "click @ui.save_material": "save-current-material"
        },

        events: {
            "click @ui.select_material": "materialSelected"
        },

        materialSelected: function (e) {
            e.stopPropagation();
            Add.Controller.addMaterialsView.hideFeedback();

            var id = parseInt($(e.currentTarget).data("id"));
            var level = parseInt($(e.currentTarget).data("level"));

            var materials = Backbone.Radio.request("app:data", "materials");

            // Delete all selected materials after level
            var selected_materials = materials.get("selected_materials");
            selected_materials.splice(level, 100);

            var selected_element = null;
            if (level == 0) {
                selected_element = HousePad.Utils.getArrayElement(materials.get("materials"), id);
            } else {
                selected_element = HousePad.Utils.getArrayElement(selected_materials[level - 1].descendants, id);
            }

            // Check for existing materials in list
            var item = Backbone.Radio.request("app:data", "inventory_item");

            var current_materials = item.get('inventory_materials');
            if (current_materials.length > 0) {
                var found = current_materials.filter(function (m) {
                    return  selected_element.id == m.get('id');
                }).length > 0;

                if (found) {
                    Add.Controller.addMaterialsView.showErrorFeedback(selected_element.name + ' is already in the materials list.');
                    $('#save-material').prop('disabled', true);
                    return;
                }
            }

            selected_materials.push(selected_element);

            Add.Controller.show();
        },

        showErrorFeedback: function (message) {
            $("#item-add-materials-feedback").html(message);
            $("#item-add-materials-feedback").addClass("alert-danger");
            $("#item-add-materials-feedback").removeClass("alert-success");
            $("#item-add-materials-feedback").show();
        },

        showSuccessFeedback: function (message) {
            $("#item-add-materials-feedback").html(message);
            $("#item-add-materials-feedback").addClass("alert-success");
            $("#item-add-materials-feedback").removeClass("alert-danger");
            $("#item-add-materials-feedback").show();
        },

        hideFeedback: function () {
            $("#item-add-materials-feedback").hide();
        }

    });
});