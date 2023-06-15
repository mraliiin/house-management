HousePad.TradeApp.module("Settings.AccountDetails.AccountInfo", function(AccountInfo, TradeApp, Backbone, Marionette, $, _) {

    AccountInfo.Controller = {
        show: function () {

            current_user = Backbone.Radio.request("app:data", "current_user");

            this.accountInfoView = new AccountInfo.AccountInfoView({model: new Backbone.Model({current_user: typeof current_user != "undefined" ? current_user.toJSON() : null})});

            //Hook account-details:update-account-info event handler
            this.accountInfoView.on("account-info:update", function () {
                AccountInfo.Controller.accountInfoView.showProgress();

                user_data = Backbone.Syphon.serialize(this);

                var save_promise = current_user.save(user_data, {patch: true});
                if (save_promise) {
                    $.when(save_promise).done(AccountInfo.Controller.completeAccountInfoUpdate);
                    $.when(save_promise).fail(function (user_data) {
                        AccountInfo.Controller.accountInfoView.hideProgress();
                        AccountInfo.Controller.accountInfoView.showFailedUpdateMessage(user_data);
                    });
                } else {
                    this.hideProgress();
                    this.showInvalidFormMessage();
                }
            });

            this.accountInfoView.on("account-info:reset", function () {
                AccountInfo.Controller.show();
            });


            TradeApp.module("Settings.AccountDetails").Controller.Layout.getRegion("account_info").show(this.accountInfoView);
        },


        completeAccountInfoUpdate : function(){
            AccountInfo.Controller.accountInfoView.hideProgress();
            AccountInfo.Controller.accountInfoView.showSuccessfulUpdateMessage();

            //Send a command to update the header in case the user name changed
            Backbone.Radio.command("header", "redraw");

        }
    }
});



