HousePad.TradeApp.module("Header", function(Header, TradeApp, Backbone, Marionette, $, _){

    Header.Controller = {

        showHeader: function(){
            var current_user = Backbone.Radio.request("app:data", "current_user");

            //If the view already exists (we are redrawing the header, destroy it first
            if (typeof this.headerView != "undefined"){
                this.headerView.destroy();
            }

            this.headerView = new Header.HeaderView({
                                model: new Backbone.Model({current_user: typeof current_user != "undefined" ? current_user.toJSON() : null})});

            TradeApp.Layout.getRegion("header").show(this.headerView);

        }
    }

    //Handle the "redraw" command on the "header" channel
    //This command will be issue by any module which made changes that require a header update
    Backbone.Radio.comply("header", "redraw", function(){
        Header.Controller.showHeader();
    });
});
