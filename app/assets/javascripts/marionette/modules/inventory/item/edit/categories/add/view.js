HousePad.TradeApp.module("Inventory.Item.Edit.Categories.Add", function(Add, TradeApp, Backbone, Marionette, $, _){

    Add.AddCategoriesView = Marionette.ItemView.extend({
        template: "#item-add-categories-template",
        tagName: "div",
        className: "col-xs-12",

        ui: {
            select_category: ".select-category",
            save_category: "#save-category"
        },

        triggers: {
            "click @ui.save_category": "save-current-category"
        },

        events: {
            "click @ui.select_category": "categorySelected"
        },

        categorySelected: function(e){
            e.stopPropagation();
            Add.Controller.addCategoriesView.hideFeedback();

            var cat_id = parseInt($(e.currentTarget).data("id"));
            var level = parseInt($(e.currentTarget).data("level"));

            var categories = Backbone.Radio.request("app:data", "categories");

            //delete all selected categories after level
            var selected_categories = categories.get("selected_categories");
            selected_categories.splice(level, 100);

            //Find the currently selected cat
            var selected_cat = null;
            if (level == 0){
                selected_cat = HousePad.Utils.getArrayElement(categories.get("categories"), cat_id);
            } else {
                selected_cat = HousePad.Utils.getArrayElement(selected_categories[level-1].descendants, cat_id);
            }

            //Add the newly selected cat to the selected_categories
            if (selected_cat != null) {
                selected_categories.push(selected_cat);
            }

            //Redraw categories
            Add.Controller.show();
        },

        showErrorFeedback: function(message){
            $("#item-add-categories-feedback").html(message);
            $("#item-add-categories-feedback").addClass("alert-danger");
            $("#item-add-categories-feedback").removeClass("alert-success");
            $("#item-add-categories-feedback").show();
        },

        showSuccessFeedback: function(message){
            $("#item-add-categories-feedback").html(message);
            $("#item-add-categories-feedback").addClass("alert-success");
            $("#item-add-categories-feedback").removeClass("alert-danger");
            $("#item-add-categories-feedback").show();
        },

        hideFeedback: function(){
            $("#item-add-categories-feedback").hide();
        }

    });
});