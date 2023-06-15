HousePad.TradeApp.module("Login", function(Login, TradeApp, Backbone, Marionette, $, _){

    Login.Controller = {
        //loginView: null,
        show: function(){
            this.loginView = new Login.LoginView();

            //Hook login:login event handler
            this.loginView.on("login:login", function(){

                //var channel = Backbone.Radio.channel("models:session");
                //var session = channel.request("new");
                var session = Backbone.Radio.request("models:session", "new");
                var login_data = Backbone.Syphon.serialize(this);
                session.set(login_data);
                var save_promise = session.save();

                if (save_promise) {
                    $.when(save_promise).done(Login.Controller.completeLogin);
                    $.when(save_promise).fail(function(login_data){
                        Login.Controller.loginView.showFailedLoginMessage(login_data);
                    });
                } else {
                    this.showInvalidFormMessage();
                }
            });

            this.loginView.on("login:register", function(){
                window.location.href = "/trade/register";
            });

            //Render login view
            TradeApp.Layout.getRegion("main_panel").show(this.loginView);

        },


        completeLogin: function(login_data){

            if (typeof login_data.housepad_token != "undefined") {

                Login.Controller.loginView.showSuccessfulLoginMessage();
                $.cookie("housepad-token", login_data.housepad_token, {expires: 180, path: "/"});
                if (login_data.redirect_path){
                    window.location.href = login_data.redirect_path;
                } else {
                    window.location.href = "/clients";
                }
            } else {
                Login.Controller.loginView.showInvalidFormMessage();
            }
        }
    }
});
