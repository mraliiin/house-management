HousePad.TradeApp.module("Settings", function(Settings, TradeApp, Backbone, Marionette, $, _){

    Settings.Controller = {

        show: function() {
            this.Layout = new Settings.SettingsLayout();
            TradeApp.Layout.getRegion("main_panel").show(this.Layout);
        }
    }
});
