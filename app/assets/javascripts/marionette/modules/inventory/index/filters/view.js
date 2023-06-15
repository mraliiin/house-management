HousePad.TradeApp.module("Inventory.Index.Filters", function(Filters, TradeApp, Backbone, Marionette, $, _){

    Filters.FiltersView = Marionette.ItemView.extend({
        template: "#inventory-filters-template",
        tagName: "div",
        className: "inventory-filters",

        ui: {
            btn_new_item: "#btn-new-item",
            btn_new_drr: "#btn-new-drr"
        },

        triggers: {
            "click @ui.btn_new_item": "item:new",
            "click @ui.btn_new_drr": "drr:new"
        },

        events: {
            'change input[name="item.status"]': 'filterByItemStatus',
            'change input[name="item.doc_type"]': 'filterByDocType',
        },

        filterByItemStatus : function(e){
            e.stopPropagation();

            var newStatus = $("input[name='item.status']:checked").val();
            Backbone.Radio.command("inventory-filters", "status-changed", newStatus);

            return false;
        },

        filterByDocType : function(e) {
            e.stopPropagation();

            var doc_type = $("input[name='item.doc_type']:checked").val();
            Backbone.Radio.command("inventory-filters", "doc-type-changed", doc_type);

            return false;
        },
    });
});