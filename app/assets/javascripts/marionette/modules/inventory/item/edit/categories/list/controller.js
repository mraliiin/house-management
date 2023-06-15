HousePad.TradeApp.module("Inventory.Item.Edit.Categories.List", function(List, TradeApp, Backbone, Marionette, $, _){

    List.Controller = {

        show: function(){
            if (List.Controller.region) {

                this.inventory_item = Backbone.Radio.request("app:data", "inventory_item");

                this.listCategoriesView = new List.ListCategoriesView({collection: this.inventory_item.get("inventory_categories")});
                List.Controller.region.show(this.listCategoriesView);
            }
        },

        deleteCategory: function(cat_id){

            if (!confirm("Are you sure?"))
                return;

            //Find the category by id
            var item_cat = List.Controller.inventory_item.get("inventory_categories").get(cat_id);
            var delete_promise = item_cat.destroy({data: { token: List.Controller.inventory_item.get("token") }, processData: true});
            if (delete_promise){
                $.when(delete_promise).done(function(){
                    List.Controller.inventory_item.get("inventory_categories").remove(item_cat);
                    List.Controller.show();
                });
                $.when(delete_promise).fail(function(){
                    List.Controller.listCategoriesView.showErrorFeedback("Failed to delete category.");
                });
            } else {
                List.Controller.listCategoriesView.showErrorFeedback("Failed to delete category.");
            }
        },

        reloadCategories: function(){
            var load_promise = $.get("/trade/inventory-items/"
                + List.Controller.inventory_item.id
                + "/categories", {token: List.Controller.inventory_item.get("token")});

            if (load_promise) {
                $.when(load_promise).done(function(item_categories){
                    var Models = TradeApp.module("Models");
                    List.Controller.inventory_item.set("inventory_categories", new Models.InventoryCategories(item_categories));
                    List.Controller.show();
                });
                $.when(load_promise).fail(function () {
                });
            } else {
            }
        }
    }
});
