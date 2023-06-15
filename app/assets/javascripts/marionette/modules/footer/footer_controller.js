HousePad.TradeApp.module("Footer", function(Footer, TradeApp, Backbone, Marionette, $, _){

    Footer.Controller = {

        showFooter: function(){
            this.footerView = new Footer.FooterView();

            TradeApp.Layout.getRegion("footer").show(this.footerView);

        }
    }
});
