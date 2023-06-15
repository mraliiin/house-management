HousePad.TradeApp.module("Inventory.Item.Edit.Conditions.List", function(List, TradeApp, Backbone, Marionette, $, _){

    List.startWithParent = false;

    List.on("start", function(options) {
        List.Controller.region = options["region"];
        List.Controller.show();
    });

    Backbone.Radio.comply("inventory-conditions", "delete:item", function(id){
        List.Controller.delete(id);
    });

    Backbone.Radio.comply("inventory-conditions", "reload:items", function(){
        List.Controller.reload();
    });

    Backbone.Radio.comply("inventory-conditions", "reload:conditions-list", function(){
        List.Controller.show();
    });
});