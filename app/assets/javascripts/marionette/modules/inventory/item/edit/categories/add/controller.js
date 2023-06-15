HousePad.TradeApp.module("Inventory.Item.Edit.Categories.Add", function(Add, TradeApp, Backbone, Marionette, $, _){

    Add.Controller = {

        show: function(){
            if (Add.Controller.region) {

                this.categories = Backbone.Radio.request("app:data", "categories");

                this.addCategoriesView = new Add.AddCategoriesView({model: this.categories});

                this.addCategoriesView.on("save-current-category", function(){
                    if (Add.Controller.categories.get("selected_categories").length > 0) {
                        var cat_id = Add.Controller.categories.get("selected_categories")[Add.Controller.categories.get("selected_categories").length-1].id;

                        var inventory_item = Backbone.Radio.request("app:data", "inventory_item");

                        var save_promise = $.post("/trade/inventory-items/"+inventory_item.id+"/categories", {category: {id: cat_id}, token: inventory_item.get("token")});

                        if (save_promise) {
                            $.when(save_promise).done(Add.Controller.completeSaveCategory);
                            $.when(save_promise).fail(function () {
                                Add.Controller.addCategoriesView.showErrorFeedback("Failed to save category.");
                            });
                        } else {
                            Add.Controller.addCategoriesView.showErrorFeedback("Failed to save category.");
                        }
                    }
                });

                Add.Controller.region.show(this.addCategoriesView);
            }
        },

        completeSaveCategory: function(){
            Add.Controller.addCategoriesView.showSuccessFeedback("Category saved.");

            //reload categories
            Backbone.Radio.command("inventory-items", "reload-categories");

            //Cleanup selected categories and redraw
            Add.Controller.categories.set("selected_categories", new Array());
            Add.Controller.show();
        }
    }
});
