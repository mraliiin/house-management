HousePad.TradeApp.module("Inventory.Index.Items", function(Items, TradeApp, Backbone, Marionette, $, _){

    Items.Controller = {
        show: function(){
            if (Items.Controller.region) {
                this.inventory_items = Backbone.Radio.request("app:data", "inventory_items");

                Items.Controller.region.show(
                    new Items.ItemsView({collection : this.inventory_items})
                );
                $("#page-overlay").hide();
            }
        },

        filterInventoryItems: function () {
            $("#page-overlay").show();

            var filters = Backbone.Radio.request("app:data", "filters");

            var params = [];
            // House id
            var house_id = filters.get('current').house_id;
            if (house_id) params.push("project=" + house_id);

            var room_id = filters.get('current').room_id;
            if (room_id) params.push("room=" + room_id);

            // Item status filter value
            var selected_status = filters.get('selected_status');
            if (selected_status && selected_status != "all") params.push("state=" + selected_status);

            // Document type filter value
            var doc_type = filters.get('doc_type');
            if (doc_type && doc_type != "all") params.push("doc_type=" + doc_type);

            // Page
            var page = filters.get('page') || 1;
            params.push("page=" + page);

            var Models = HousePad.TradeApp.module("Models");
            var inventory_items = new Models.InventoryItems();

            var url = params.length > 0 ? "inventory?" + params.join("&") : "inventory";
            inventory_items.url = "/trade/" + url;

            Backbone.history.navigate(url, { trigger: false });
            Items.Controller._showItems(inventory_items, page);

        },

        _showItems: function (inventory_items, page) {
            var fetch_promise = inventory_items.fetch();

            if (fetch_promise) {
                $.when(fetch_promise).done(function () {
                    var Models = HousePad.TradeApp.module("Models");

                    Backbone.Radio.command("app:data", "set_inventory_items", inventory_items);
                    Items.Controller.Items = inventory_items;

                    Items.Controller.show();
                    $("#page-overlay").hide();
                });
            }
        },
    }
});
