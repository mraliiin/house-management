HousePad.TradeApp.module("Models", function(Models, TradeApp, Backbone, Marionette, $, _){

    Models.User = Backbone.Model.extend({
        urlRoot: "/trade/users",

        validate: function(attrs, options){
            var errors = {};
            var valid = true;

            if (attrs.email == ""){
                valid = false;
                errors['email'] = "Please enter your email address.";
            }
            else if (!/^\w+([\.\+-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i.test(attrs.email)){
                valid = false;
                errors["email"] = "Please enter a valid email address.";
            }


            if (attrs.phone == ""){
                valid = false;
                errors['phone'] = "Please enter your cell phone number.";
            }

            if (attrs.password == ""){
                valid = false;
                errors['password'] = "Please enter a password.";
            }

            if (attrs.agree_terms != true) {
                valid = false;
                errors["agree_terms"] = "You must agree to the terms before finishing registration";
            }

            if (valid == false)
                return errors;
        }
    });

});