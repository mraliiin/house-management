HousePad.TradeApp.module("Settings.Billing.Info.SelectPlan", function(SelectPlan, TradeApp, Backbone, Marionette, $, _){

    SelectPlan.Controller = {

        show: function(options){
            this.current_user = Backbone.Radio.request("app:data", "current_user");

            this.current_user.set("plan_mode", options.mode);

            this.selectPlanView = new SelectPlan.SelectPlanView({model: this.current_user});

            $('#billing-info-modal').modal({});
            $("#billing-info-modal").on("hide.bs.modal", function(){
                TradeApp.module("Settings.Billing.Info.SelectPlan").stop();
            });
            TradeApp.billing_info_modal.show(this.selectPlanView);

            this.selectPlanView.on("braintree-plan:select", function(obj){
                $(".braintree-plan").removeClass("active");
                $(obj).addClass("active");
                $("#btn-braintree-plan-selected").removeClass("disabled");

                SelectPlan.Controller.current_user.set("selected_braintree_plan", SelectPlan.Controller.current_user.get("braintree_plans").get($(obj).data("id")).attributes);
            });

            this.selectPlanView.on("braintree-plan:selected", function(){
                TradeApp.module("Settings.Billing.Info.SelectPlan").stop();
                TradeApp.module("Settings.Billing.Info.PaymentMethod").start();
            });

            this.selectPlanView.on("braintree-plan:confirm", function(){

                if (SelectPlan.Controller.current_user.get("selected_braintree_plan").active == true){
                    TradeApp.module("Settings.Billing.Info.SelectPlan").stop();
                    $('#billing-info-modal').modal("hide");
                } else {
                    SelectPlan.Controller.selectPlanView.showProgress();
                    SelectPlan.Controller.updatePlan();
                }
            });
        },

        updatePlan: function(){
            var save_promise = $.post("/trade/users/update-subscription.json", {plan_id: SelectPlan.Controller.current_user.get("selected_braintree_plan").id});
            if (save_promise) {
                $.when(save_promise).done(function(res){
                    SelectPlan.Controller.updateModel(res);

                    SelectPlan.Controller.selectPlanView.hideProgress();
                    SelectPlan.Controller.selectPlanView.showPlanUpdated();

                    TradeApp.module("Settings.Billing.Info.SelectPlan").stop();
                    $('#billing-info-modal').modal("hide");

                    //Trigger billing info render event
                    Backbone.Radio.trigger("billing-info", "render");
                });
                $.when(save_promise).fail(function () {
                    SelectPlan.Controller.selectPlanView.hideProgress();
                    SelectPlan.Controller.selectPlanView.showPlanUpdateFailed();
                });
            } else {
                SelectPlan.Controller.selectPlanView.hideProgress();
                SelectPlan.Controller.selectPlanView.showPlanUpdateFailed();
            }
        },

        updateModel: function(res) {
            //Update plan in the user model
            SelectPlan.Controller.current_user.get("braintree_subscription").plan = res.plan;
            SelectPlan.Controller.current_user.get("braintree_subscription").next_billing_date = res.subscription.next_billing_date;
            SelectPlan.Controller.current_user.get("braintree_subscription").next_billing_period_amount = res.subscription.next_billing_period_amount;

            //Go through plans and mark active the new plan
            for (var i=0; i<SelectPlan.Controller.current_user.get("braintree_plans").length; i++) {
                var plan = SelectPlan.Controller.current_user.get("braintree_plans").at(i);
                if (plan.id == res.plan.id){
                    plan.set("active", true);
                } else {
                    plan.set("active", false);
                }

            }
        }
    }
});
