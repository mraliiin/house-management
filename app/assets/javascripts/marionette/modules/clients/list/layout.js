HousePad.TradeApp.module("Clients.List", function(List, TradeApp, Backbone, Marionette, $, _){

    List.ClientsListLayout = Backbone.Marionette.LayoutView.extend({
        template: "#clients-template",
        tagName: "div",
        className: "row",

        regions: {
            clients_list: "#clients-list-container",
            client_new: "#client-new-container",
            client_ddr: "#inventory-request-info",
        }
    });
});