HousePad.TradeApp.module("Registration", function(Registration, TradeApp, Backbone, Marionette, $, _){

    Registration.Controller = {

        show: function(){
            this.registrationView = new Registration.RegistrationView();

            this.registrationView.on("registration:register", function(){

                var Models = HousePad.TradeApp.module("Models");
                var user = new Models.User();
                var registration_data = Backbone.Syphon.serialize(this);
                user.set(registration_data);

                user.on("invalid", function(model, errors){
                    Registration.Controller.registrationView.showErrorMessages(errors);
                });

                Registration.Controller.registrationView.clearErrorMessages();
                var save_promise = user.save();

                if (save_promise) {
                    $.when(save_promise).done(Registration.Controller.completeRegistration);
                    $.when(save_promise).fail(function(res){
                        Registration.Controller.registrationView.showRegistrationFailedMessage(res);
                    });
                } else {
                    this.showRegistrationFailedMessage();
                }
            });

            this.registrationView.on("registration:login", function(){
                window.location.href = "/trade/login";
            });

            //Render registration view
            TradeApp.Layout.getRegion("main_panel").show(this.registrationView);
            this.registrationView.enableTooltips();
        },


        completeRegistration: function(login_data){

            if (typeof login_data.housepad_token != "undefined") {

                Registration.Controller.registrationView.showSuccessfulRegistrationMessage();
                $.cookie("housepad-token", login_data.housepad_token, {expires: 180, path: "/"});
                window.location.href = "/trade/clients";
            } else {
                Registration.Controller.loginView.showInvalidFormMessage();
            }
        }
    }
});
