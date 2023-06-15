HousePad.TradeApp.module("Models", function(Models, TradeApp, Backbone, Marionette, $, _){

    Models.Room = Backbone.Model.extend({
        url: function(){
            if (this.get("house_id")){
                if (this.id) {
                    return "/trade/homes/" + this.get("house_id") + "/rooms/" + this.id;
                } else {
                    return "/trade/homes/" + this.get("house_id") + "/rooms";
                }
            }
        },

        enter_delete_mode: function(){
            this.set("delete_mode", true);
            for (var i=0; i<this.get("snapshots").length; i++) {
                var snapshot = this.get("snapshots").at(i);
                snapshot.set("delete_mode", true);
            }
        },

        exit_delete_mode: function(){
            this.set("delete_mode", false);
            for (var i=0; i<this.get("snapshots").length; i++) {
                var snapshot = this.get("snapshots").at(i);
                snapshot.set("delete_mode", false);
            }
        }
    });

});