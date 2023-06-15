HousePad.TradeApp.module("Models", function(Models, TradeApp, Backbone, Marionette, $, _){

    Models.InventoryItem = Backbone.Model.extend({

        url: function(){
            if (this.id > 0)
                return "/trade/inventory-items/"+this.id;
            else
                return "/trade/inventory-items"
        }
    });

});