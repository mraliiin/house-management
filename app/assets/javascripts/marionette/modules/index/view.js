HousePad.TradeApp.module("Index", function(Index, TradeApp, Backbone, Marionette, $, _){

    Index.IndexView = Marionette.ItemView.extend({
        template: "#index-template",
        tagName: "div",
        className: "row",

        ui: {
            btn_save_new_client: "#btn-save-new-client",
            btn_cancel_new_client: "#btn-cancel-new-client"
        },

        triggers: {
            "click @ui.btn_save_new_client": "new-client:save",
            "click @ui.btn_cancel_new_client": "new-client:cancel"
        }
    });
});