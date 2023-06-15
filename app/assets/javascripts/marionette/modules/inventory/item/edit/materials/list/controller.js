HousePad.TradeApp.module("Inventory.Item.Edit.Materials.List", function (List, TradeApp, Backbone, Marionette, $, _) {

    List.Controller = {
        show: function () {
            if (List.Controller.region) {
                this.inventory_item = Backbone.Radio.request("app:data", "inventory_item");
                this.listMaterialsView = new List.ListMaterialsView({collection: this.inventory_item.get("inventory_materials")});
                List.Controller.region.show(this.listMaterialsView);
            }
        },

        deleteById: function (id) {
            if (!confirm("Are you sure?")) return;

            var material = List.Controller.inventory_item.get("inventory_materials").get(id);
            var delete_promise = material.destroy({
                data: { token: List.Controller.inventory_item.get("token") },
                processData: true
            });

            if (delete_promise) {
                $.when(delete_promise).done(function () {
                    List.Controller.inventory_item.get("inventory_materials").remove(material);
                    List.Controller.show();
                });

                $.when(delete_promise).fail(function () {
                    List.Controller.listMaterialsView.showErrorFeedback("Failed to delete material.");
                });

            } else {
                List.Controller.listMaterialsView.showErrorFeedback("Failed to delete material.");
            }
        },

        reloadMaterials: function () {
            var load_promise = $.get("/trade/inventory-items/"
                + List.Controller.inventory_item.id
                + "/materials", {token: List.Controller.inventory_item.get("token")});

            if (load_promise) {
                $.when(load_promise).done(function (item_materials) {
                    var Models = TradeApp.module("Models");
                    List.Controller.inventory_item.set("inventory_materials", new Models.InventoryMaterials(item_materials));
                    List.Controller.show();
                });
                $.when(load_promise).fail(function () { });
            }
        }
    }
});
