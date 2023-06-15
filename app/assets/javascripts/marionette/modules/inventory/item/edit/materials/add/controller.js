HousePad.TradeApp.module("Inventory.Item.Edit.Materials.Add", function (Add, TradeApp, Backbone, Marionette, $, _) {

    Add.Controller = {
        show: function () {
            if (Add.Controller.region) {

                this.materials = Backbone.Radio.request("app:data", "materials");
                this.addMaterialsView = new Add.AddMaterialsView({model: this.materials});
                this.addMaterialsView.on("save-current-material", function () {
                    if (Add.Controller.materials.get("selected_materials").length > 0) {
                        var material_id = Add.Controller.materials.get("selected_materials")[Add.Controller.materials.get("selected_materials").length - 1].id;

                        var inventory_item = Backbone.Radio.request("app:data", "inventory_item");

                        var save_promise = $.post("/trade/inventory-items/"
                            + inventory_item.id
                            + "/materials", {material: {id: material_id}, token: inventory_item.get("token")});

                        if (save_promise) {
                            $.when(save_promise).done(Add.Controller.completeSaveMaterial);
                            $.when(save_promise).fail(function () {
                                Add.Controller.addMaterialsView.showErrorFeedback("Failed to save material.");
                            });
                        } else {
                            Add.Controller.addMaterialsView.showErrorFeedback("Failed to save material.");
                        }
                    }
                });
                Add.Controller.region.show(this.addMaterialsView);
            }
        },

        completeSaveMaterial: function () {
            Add.Controller.addMaterialsView.showSuccessFeedback("Material saved.");
            Backbone.Radio.command("inventory-items", "reload-materials");
            Add.Controller.materials.set("selected_materials", new Array());
            Add.Controller.show();
        }
    }
});
