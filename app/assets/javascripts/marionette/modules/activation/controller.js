HousePad.TradeApp.module("Activation", function(Activation, TradeApp, Backbone, Marionette, $, _){

    Activation.Controller = {

        show: function(){
            this.activationView = new Activation.ActivationView();


            this.activationView.on("activation:confirm", function(){

                this.hideFeedback();

                if ($("#agree_terms").prop("checked")) {

                    Activation.Controller.activationView.showProgress();

                    var account_data = Backbone.Syphon.serialize(this);
                    var trade_account = Backbone.Radio.request("models:trade_account", "new");
                    trade_account.set(account_data);
                    //
                    var save_promise = trade_account.save();
                    if (save_promise) {
                        $.when(save_promise).done(Activation.Controller.showConfirmation);
                        $.when(save_promise).fail(function () {
                            Activation.Controller.activationView.hideProgress();
                            Activation.Controller.activationView.showErrorFeedback("Failed to activate your trade account.");
                        });
                    } else {
                        Activation.Controller.activationView.hideProgress();
                        this.showInvalidFormMessage();
                    }
                }
                else {
                    this.showInvalidFormMessage();
                }
            });


            TradeApp.Layout.getRegion("main_panel").show(this.activationView);
        },

        showConfirmation: function(){
            this.confirmationView = new Activation.ConfirmationView();
            TradeApp.Layout.getRegion("main_panel").show(this.confirmationView);
        }

    }
});
