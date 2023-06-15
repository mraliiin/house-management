HousePad.TradeApp = new Marionette.Application();

HousePad.TradeApp.addRegions({
    mainContainerRegion: "#main-container"
});

HousePad.TradeApp.on("before:start", function(options){

    if (typeof options != "undefined") {
        //Current user
        if (typeof options.current_user != "undefined"){
            this.current_user = options.current_user;
        }
        Backbone.Radio.reply("app:data", "current_user", function () {
            return HousePad.TradeApp.current_user;
        });

        //Trade clients
        if (typeof options.trade_clients != "undefined"){
            this.trade_clients = options.trade_clients;
        }
        Backbone.Radio.reply("app:data", "trade_clients", function () {
            return HousePad.TradeApp.trade_clients;
        });
        Backbone.Radio.comply("app:data", "set_trade_clients", function (trade_clients) {
            HousePad.TradeApp.trade_clients = trade_clients;
            return HousePad.TradeApp.trade_clients;
        });

        //Trade client
        if (typeof options.trade_client != "undefined"){
            this.trade_client = options.trade_client;
        }
        Backbone.Radio.reply("app:data", "trade_client", function () {
            return HousePad.TradeApp.trade_client;
        });
        Backbone.Radio.comply("app:data", "set_trade_client", function (trade_client) {
            HousePad.TradeApp.trade_client = trade_client;
            return HousePad.TradeApp.trade_client;
        });

        //Houses
        if (typeof options.houses != "undefined"){
            this.houses = options.houses;
        }
        Backbone.Radio.reply("app:data", "houses", function () {
            return HousePad.TradeApp.houses;
        });
        Backbone.Radio.comply("app:data", "set_houses", function (house) {
            HousePad.TradeApp.houses = houses;
            return HousePad.TradeApp.houses;
        });

        //House
        if (typeof options.house != "undefined"){
            this.house = options.house;
        }
        Backbone.Radio.reply("app:data", "house", function () {
            return HousePad.TradeApp.house;
        });
        Backbone.Radio.comply("app:data", "set_house", function (house) {
            HousePad.TradeApp.house = house;
            return HousePad.TradeApp.house;
        });

        //Room
        if (typeof options.room != "undefined"){
            this.room = options.room;
        }
        Backbone.Radio.reply("app:data", "room", function () {
            return HousePad.TradeApp.room;
        });
        Backbone.Radio.comply("app:data", "set_room", function (room) {
            HousePad.TradeApp.room = room;
            return HousePad.TradeApp.room;
        });

        //InventoryItem
        if (typeof options.inventory_item != "undefined"){
            this.inventory_item = options.inventory_item;
        }
        Backbone.Radio.reply("app:data", "inventory_item", function () {
            return HousePad.TradeApp.inventory_item;
        });
        Backbone.Radio.comply("app:data", "set_inventory_item", function (inventory_item) {
            HousePad.TradeApp.inventory_item = inventory_item;
            return HousePad.TradeApp.inventory_item;
        });


        //InventoryItems
        if (typeof options.inventory_items != "undefined"){
            this.inventory_items = options.inventory_items;
        }
        Backbone.Radio.reply("app:data", "inventory_items", function () {
            return HousePad.TradeApp.inventory_items;
        });
        Backbone.Radio.comply("app:data", "set_inventory_items", function (inventory_items) {
            HousePad.TradeApp.inventory_items = inventory_items;
            return HousePad.TradeApp.inventory_items;
        });


        //Inventory Filters
        if (typeof options.filters != "undefined"){
            this.filters = options.filters;
        }
        Backbone.Radio.reply("app:data", "filters", function () {
            return HousePad.TradeApp.filters;
        });
        Backbone.Radio.comply("app:data", "set_filters", function (filters) {
            HousePad.TradeApp.filters = filters;
            return HousePad.TradeApp.filters;
        });

        //Categories
        if (typeof options.categories != "undefined"){
            this.categories = options.categories;
        }
        Backbone.Radio.reply("app:data", "categories", function () {
            return HousePad.TradeApp.categories;
        });

        // Materials
        if (typeof options.materials != "undefined") this.materials = options.materials;
        Backbone.Radio.reply("app:data", "materials", function () {
            return HousePad.TradeApp.materials;
        });

        // Conditions
        if (typeof options.conditions != "undefined"){
            this.conditions = options.conditions;
        }
        Backbone.Radio.reply("app:data", "conditions", function () {
            return HousePad.TradeApp.conditions;
        });

        // Periods
        if(typeof options.periods != "undefined"){
            this.periods = options.periods;
        }
        Backbone.Radio.reply("app:data", "periods", function(){
            return HousePad.TradeApp.periods;
        })

        // Measurements
        if(typeof options.measurements != "undefined"){
            this.measurements = options.measurements;
        }
        Backbone.Radio.reply("app:data", "measurements", function(){
            return HousePad.TradeApp.measurements;
        })
        Backbone.Radio.comply("app:data", "set_measurements", function (measurements) {
            HousePad.TradeApp.measurements = measurements;
            return HousePad.TradeApp.measurements;
        });
    }

    this.Layout = new HousePad.TradeAppLayout();
    this.getRegion("mainContainerRegion").show(this.Layout);
});

