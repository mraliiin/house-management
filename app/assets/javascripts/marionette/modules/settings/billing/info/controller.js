HousePad.TradeApp.module("Settings.Billing.Info", function(Info, TradeApp, Backbone, Marionette, $, _) {

    Info.Controller = {
        show: function () {

            this.current_user = Backbone.Radio.request("app:data", "current_user");

            this.infoView = new Info.InfoView({model: this.current_user});

            //Render billing info view
            TradeApp.module("Settings.Billing").Controller.Layout.getRegion("billing_info").show(this.infoView);

            //this.infoView.on("billing-info:update-payment-method", function(){
            //    Info.Controller.infoView.hideFeedback();
            //});

            this.infoView.on("billing-info:activate-plan", function(){
                //Start Billing Select Plan module
                TradeApp.module("Settings.Billing.Info.SelectPlan").start();
            });

            this.infoView.on("billing-info:change-plan", function(){
                TradeApp.module("Settings.Billing.Info.SelectPlan").start({mode: "plan"});
            });

            this.infoView.on("billing-info:configure-payment", function(){
                TradeApp.module("Settings.Billing.Info.PaymentMethod").start({mode: "payment"});
            });

            Backbone.Radio.on("billing-info", "render", function(){
                Info.Controller.infoView.render();
            });
        }

    }
});



