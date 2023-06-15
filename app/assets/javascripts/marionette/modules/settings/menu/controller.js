HousePad.TradeApp.module("Settings.Menu", function(Menu, TradeApp, Backbone, Marionette, $, _){

    Menu.Controller = {
        show: function(mode){
            this.menuView = new Menu.MenuView();

            TradeApp.module("Settings").Controller.Layout.getRegion("menu").show(this.menuView);

            if (mode == "account-details") {
                this.menuView.ui.nav_billing.parent().removeClass("active");
                this.menuView.ui.nav_account_details.parent().addClass("active");
            } else if (mode == "billing") {
                this.menuView.ui.nav_account_details.parent().removeClass("active");
                this.menuView.ui.nav_billing.parent().addClass("active");
            }
        }
    }
});
