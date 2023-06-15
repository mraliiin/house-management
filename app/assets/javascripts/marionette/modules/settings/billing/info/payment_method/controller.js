HousePad.TradeApp.module("Settings.Billing.Info.PaymentMethod", function(PaymentMethod, TradeApp, Backbone, Marionette, $, _){

    PaymentMethod.Controller = {

        show: function(options){
            this.current_user = Backbone.Radio.request("app:data", "current_user");

            this.current_user.set("payment_mode", options.mode);

            this.paymentMethodView = new PaymentMethod.PaymentMethodView({model: this.current_user});

            $('#billing-info-modal').modal({});

            braintree.setup(PaymentMethod.Controller.current_user.get("braintree_client_token"), "dropin", {
                container: "payment-form",
                onPaymentMethodReceived: function(obj){

                    if (PaymentMethod.Controller.current_user.get("payment_mode") == "subscription") {

                        TradeApp.module("Settings.Billing.Info.PaymentMethod").stop();
                        PaymentMethod.Controller.current_user.set("selected_payment_method", obj);
                        TradeApp.module("Settings.Billing.Info.ConfirmSubscription").start();

                    } else if (PaymentMethod.Controller.current_user.get("payment_mode") == "payment") {

                        PaymentMethod.Controller.paymentMethodView.showProgress();
                        PaymentMethod.Controller.updatePaymentMethod(obj);
                    }
                }
            });

            $("#billing-info-modal").on("hide.bs.modal", function(){
                TradeApp.module("Settings.Billing.Info.PaymentMethod").stop();
            });

            TradeApp.billing_info_modal.show(this.paymentMethodView);


            this.paymentMethodView.on("payment-method:save", function(){
                TradeApp.module("Settings.Billing.Info.PaymentMethod").stop();
                TradeApp.module("Settings.Billing.Info.ConfirmSubscription").start();
            });

            this.paymentMethodView.on("payment-method:back", function(){
                TradeApp.module("Settings.Billing.Info.PaymentMethod").stop();
                TradeApp.module("Settings.Billing.Info.SelectPlan").start();
            });
        },

        updatePaymentMethod: function(obj) {
            var save_promise = $.post("/trade/users/update-subscription.json", {payment_method_nonce: obj.nonce});
            if (save_promise) {
                $.when(save_promise).done(function(res){
                    //Update payment method in the user model
                    PaymentMethod.Controller.current_user.get("braintree_subscription").payment_method = res.payment_method;

                    PaymentMethod.Controller.paymentMethodView.hideProgress();
                    PaymentMethod.Controller.paymentMethodView.showPaymentMethodUpdated();

                    TradeApp.module("Settings.Billing.Info.PaymentMethod").stop();
                    $('#billing-info-modal').modal("hide");

                    //Trigger billing info render event
                    Backbone.Radio.trigger("billing-info", "render");
                });
                $.when(save_promise).fail(function () {
                    PaymentMethod.Controller.paymentMethodView.hideProgress();
                    PaymentMethod.Controller.paymentMethodView.showPaymentMethodUpdateFailed();
                });
            } else {
                PaymentMethod.Controller.paymentMethodView.hideProgress();
                PaymentMethod.Controller.paymentMethodView.showPaymentMethodUpdateFailed();
            }
        }
    }
});
