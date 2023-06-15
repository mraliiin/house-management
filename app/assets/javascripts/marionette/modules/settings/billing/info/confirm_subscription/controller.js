HousePad.TradeApp.module("Settings.Billing.Info.ConfirmSubscription", function(ConfirmSubscription, TradeApp, Backbone, Marionette, $, _){

    ConfirmSubscription.Controller = {

        show: function(){
            this.current_user = Backbone.Radio.request("app:data", "current_user");

            this.confirmSubscriptionView = new ConfirmSubscription.ConfirmSubscriptionView({model: this.current_user});

            $('#billing-info-modal').modal({});

            $("#billing-info-modal").on("hide.bs.modal", function(){
                TradeApp.module("Settings.Billing.Info.ConfirmSubscription").stop();
            });

            this.confirmSubscriptionView.on("subscription:confirm", function(){

                ConfirmSubscription.Controller.confirmSubscriptionView.hideFeedback();
                ConfirmSubscription.Controller.confirmSubscriptionView.showProgress();
                ConfirmSubscription.Controller.confirmSubscriptionView.disableButtons();


                var save_promise = $.post("/trade/users/update-subscription.json",
                                            {customer_id: ConfirmSubscription.Controller.current_user.get("braintree_customer_id"),
                                                payment_method_nonce: ConfirmSubscription.Controller.current_user.get("selected_payment_method").nonce,
                                                plan_id: ConfirmSubscription.Controller.current_user.get("selected_braintree_plan").id});
                if (save_promise) {
                    $.when(save_promise).done(function(res){
                        ConfirmSubscription.Controller.confirmSubscriptionView.showSubscriptionUpdated();
                        TradeApp.module("Settings.Billing.Info.ConfirmSubscription").stop();
                        $('#billing-info-modal').modal("hide");

                        ConfirmSubscription.Controller.current_user.set("braintree_subscription", res.subscription);

                        //Trigger billing info render event
                        Backbone.Radio.trigger("billing-info", "render");
                    });
                    $.when(save_promise).fail(function () {
                        ConfirmSubscription.Controller.confirmSubscriptionView.showSubscriptionUpdateFailed();
                    });
                } else {
                    ConfirmSubscription.Controller.confirmSubscriptionView.showSubscriptionUpdateFailed();
                }
            });


            this.confirmSubscriptionView.on("subscription:back", function(){
                TradeApp.module("Settings.Billing.Info.ConfirmSubscription").stop();
                TradeApp.module("Settings.Billing.Info.PaymentMethod").start();
            });

            TradeApp.billing_info_modal.show(this.confirmSubscriptionView);
        }
    }
});
