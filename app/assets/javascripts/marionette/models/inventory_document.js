HousePad.TradeApp.module("Models", function(Models, TradeApp, Backbone, Marionette, $, _){

    Models.InventoryDocument = Backbone.Model.extend({

        url: function(){
            if (this.id > 0)
                return "/trade/inventory-items/"+this.get("inventory_item_id")+"/documents/"+this.id;
            else
                return "/trade/inventory-items/"+this.get("inventory_item_id")+"/documents/";
        }
    });

});