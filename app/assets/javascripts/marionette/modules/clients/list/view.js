HousePad.TradeApp.module("Clients.List", function(List, TradeApp, Backbone, Marionette, $, _){

    List.ListView = Marionette.ItemView.extend({
        template: "#clients-list-template",
        tagName: "div",
        className: "row",

        ui: {
            btn_delete_client: ".btn-delete-client",
            trade_client_row: ".trade-client-row",
            btn_add_home: "#btn-new-home",
            client_row: ".trade-client-row",
            btn_view_client: ".btn-view-client",
            btn_edit_client: ".btn-edit-client",
            btn_delete_project: ".btn-delete-project"
        },

        triggers: {
            "click @ui.btn_add_home": "clients:new-home"
        },

        events: {
            'change input[name="client.status"]': 'filterByClientStatus',
            "click @ui.btn_delete_client": "deleteClient",
            "mouseover @ui.client_row": "mouseOverClientRow",
            "mouseout @ui.client_row": "mouseOutClientRow",
            "click @ui.btn_view_client": "viewClient",
            "click @ui.btn_edit_client": "editClient",
            "click @ui.btn_delete_project": "deleteProject",
            "click .btn-complete-project": "completeProject",
        },

        filterByClientStatus : function(e){
            e.stopPropagation();
            var newStatus = $("input[name='client.status']:checked").val();
            Backbone.Radio.command("clients", "status-changed", newStatus);

            return false;
        },

        mouseOverClientRow: function(e) {
          var client_id = $(e.currentTarget).data("id");
            $("#trade-client-row-"+client_id+" .client-actions").show();
        },

        mouseOutClientRow: function(e) {
            var client_id = $(e.currentTarget).data("id");
            $("#trade-client-row-"+client_id+" .client-actions").hide();
        },

        deleteClient: function(e){
            e.stopPropagation();

            var client_id = $(e.currentTarget).data("id");
            this.trigger("clients:delete", client_id);
        },

        deleteProject: function(e) {
            e.stopPropagation();

            var client_id = $(e.currentTarget).data("client-id");
            var project_id = $(e.currentTarget).data("id");
            this.trigger("projects:delete", client_id, project_id);
        },

        completeProject: function(e) {
            e.stopPropagation();

            var client_id = $(e.currentTarget).data("client-id");
            var project_id = $(e.currentTarget).data("id");
            this.trigger("projects:complete", client_id, project_id);
        },

        viewClient: function(e){
            e.stopPropagation();
            var client_id = $(e.currentTarget).data("id");

            Backbone.Radio.trigger("clients", "view", client_id);
        },

        editClient: function(e){
            e.stopPropagation();
            var client_id = $(e.currentTarget).data("id");

            Backbone.Radio.trigger("clients", "edit", client_id);
        },
        //showClient: function(e){
        //    e.stopPropagation();
        //
        //    var client_id = $(e.currentTarget).data("id");
        //    window.location.href="/trade/clients/"+client_id;
        //},

        showErrorFeedback: function(error_message){
            $("#delete-client-feedback").addClass("alert-danger");
            $("#delete-client-feedback").removeClass("alert-success");
            $("#delete-client-feedback").html(error_message);
        },

        showSuccessfulDeleteMessage: function(){
            $("#delete-client-feedback").removeClass("alert-danger");
            $("#delete-client-feedback").addClass("alert-success");
            $("#delete-client-feedback").html("Client deleted.");
        },

        hideProgress: function(){
            $("#page-overlay").hide();
        }
    });
});