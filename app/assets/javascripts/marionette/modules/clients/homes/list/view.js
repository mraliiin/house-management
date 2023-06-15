HousePad.TradeApp.module("Clients.Homes.List", function(List, TradeApp, Backbone, Marionette, $, _){

    List.ListView = Marionette.ItemView.extend({
        template: "#client-homes-template",
        tagName: "div",
        className: "row",

        ui: {
            btn_add_home: ".btn-add-home",
            btn_save_home: "#btn-save-home",
            btn_del_mode: ".btn-delete-mode",
            btn_delete_home: ".btn-delete-home"
        },

        triggers: {
            "click @ui.btn_add_home": "homes:add-home",
            "click @ui.btn_save_home": "homes:save-home",
            "click @ui.btn_del_mode": "homes:delete-mode"
        },

        events: {
            "click @ui.btn_delete_home": "deleteHome"
        },

        deleteHome: function(e){
            e.stopPropagation();

            if (!confirm("Are you sure?")) {
                return;
            }

            var home_id = $(e.currentTarget).data("id");
            this.trigger("home:delete", home_id);
        },

        showErrorFeedback: function(error_message){
            $(".homes-feedback").addClass("alert-danger");
            $(".homes-feedback").removeClass("alert-success");
            $(".homes-feedback").html(error_message);
            $(".homes-feedback").show();
        }

    });
});