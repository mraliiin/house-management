HousePad.TradeApp.module("Rooms.Lookbook", function(Lookbook, TradeApp, Backbone, Marionette, $, _){

    Lookbook.startWithParent = false;

    Lookbook.on("start", function() {
        Lookbook.Controller.show();
    });

    Backbone.Radio.comply("room", "reload", function(){
        Lookbook.Controller.reloadRoom();
    });

    Backbone.Radio.comply("image", "view", function(image_id){
        var room = Backbone.Radio.request("app:data", "room");
        var image = room.get("snapshots").get(image_id);

        HousePad.TradeApp.module("Rooms.Images.Show").stop();
        HousePad.TradeApp.module("Rooms.Images.Show").start(
        {
            region: Lookbook.Controller.layout.getRegion("room_image_modal"),
            image: image
        });

    });
});