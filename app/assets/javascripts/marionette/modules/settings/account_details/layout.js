HousePad.TradeApp.module("Settings.AccountDetails", function(AccountDetails, TradeApp, Backbone, Marionette, $, _){

    AccountDetails.AccountDetailsLayout = Backbone.Marionette.LayoutView.extend({
        template: "#account-details-template",
        tagName: "div",
        className: "row",

        regions: {
            account_avatar: "#avatar-container",
            account_info: "#account-info-container"
        }
    });
});