HousePad.TradeApp.module("Inventory.Item.Edit.Categories.List", function(List, TradeApp, Backbone, Marionette, $, _){

    List.startWithParent = false;

    List.on("start", function(options) {
        List.Controller.region = options["region"];
        List.Controller.show();
    });

    Backbone.Radio.comply("inventory-item-category", "delete", function(cat_id){
        List.Controller.deleteCategory(cat_id);
    });

    Backbone.Radio.comply("inventory-items", "reload-categories", function(){
        List.Controller.reloadCategories();
    });
});