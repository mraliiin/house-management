HousePad.TradeApp.module("Inventory.Item.Edit.Periods.List", function (List, TradeApp, Backbone, Marionette, $, _) {

    List.startWithParent = false;

    List.on("start", function (options) {
        List.Controller.region = options["region"];
        List.Controller.show();
    });

    Backbone.Radio.comply("inventory-periods", "delete:item", function (id) {
        List.Controller.delete(id);
    });

    Backbone.Radio.comply("inventory-periods", "reload:items", function () {
        List.Controller.reload();
    });

    Backbone.Radio.comply("inventory-periods", "reload:periods-list", function () {
        List.Controller.show();
    });
});