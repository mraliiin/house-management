HousePad.TradeApp.module("Models", function(Models, TradeApp, Backbone, Marionette, $, _){

    Models.InventoryCategory = Backbone.Model.extend({

        url: function(){
            if (this.id > 0){
                if (this.get("item_id"))
                    return "/trade/inventory-items/"+this.get("item_id")+"/categories/"+this.id;
                else
                    return "/trade/inventory-items/categories/"+this.id;
            }
            else
                return "/trade/inventory-items/categories";
        }
    });

    Models.InventoryCategoriesSelector = Backbone.Model.extend({
    });

    Models.InventoryCategories = Backbone.Collection.extend({
        model: Models.InventoryCategory
    });

});