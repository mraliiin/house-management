HousePad.TradeApp.module("Inventory.Item.Edit.Materials.List", function(List, TradeApp, Backbone, Marionette, $, _){

    List.startWithParent = false;

    List.on("start", function(options) {
        List.Controller.region = options["region"];
        List.Controller.show();
    });

    Backbone.Radio.comply("inventory-item-material", "delete", function(id){
        List.Controller.deleteById(id);
    });

    Backbone.Radio.comply("inventory-items", "reload-materials", function(){
        List.Controller.reloadMaterials();
    });
});