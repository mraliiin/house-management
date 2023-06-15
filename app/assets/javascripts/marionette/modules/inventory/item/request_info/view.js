HousePad.TradeApp.module("Inventory.Item.RequestInfo", function(RequestInfo, TradeApp, Backbone, Marionette, $, _){

    RequestInfo.RequestInfoView = Marionette.ItemView.extend({
        template: "#inventory-request-info-template",
        tagName: "div",
        className: "row",

        ui: {
            btn_request_info: "#btn-request-info",
            btn_cancel_request_info: "#btn-cancel-request-info",
        },

        triggers: {
            "click @ui.btn_request_info": "inventory-item:request-info",
            "click @ui.btn_cancel_request_info": "inventory-item:cancel-request-info",
            "change #project_selector": "new-ddr:project_changed",
            "change #client_selector": "new-ddr:client_changed",
        },

        events: {
            "click #showMoreBtn" : "toggleFields",
        },

        toggleFields: function(e) {
            e.preventDefault();

            $('#fieldsContainer').slideToggle("slow");

            var text = $('#showMoreBtn').text() == "Show sections" ? "Hide sections" : "Show sections";
            $('#showMoreBtn').text(text);
        },

        showProgress: function(){
            $("#request-info-progress").show();
        },

        hideProgress: function(error_message){
            $("#request-info-progress").hide();
        },

        showFailedSaveMessage: function(message){
            if(message) {
                this.showItemFeedback(message, "alert-danger");
            } else {
                this.showItemFeedback("Failed to save item. Please try again or contact <a href='mailto:support@housepadapp.com'>support@Housepadapp.com</a>.", "alert-danger");
            }
        },

        showSuccessfulSaveMessage: function(){
            this.showItemFeedback("Request sent.", "alert-success");
        },

        showItemFeedback: function(feedback, alert_class){
            $("#request-info-feedback").html(feedback);
            $("#request-info-feedback").removeClass("alert-danger");
            $("#request-info-feedback").removeClass("alert-success");
            $("#request-info-feedback").addClass(alert_class);
            $("#request-info-feedback").show();
        },

        hideItemFeedback: function(){
            $("#request-info-feedback").hide();
        }
    });

    RequestInfo.BreadcrumbsView = Marionette.ItemView.extend({
        template: "#ddr-breadcrumbs-template",
        tagName: "div",
    });
});