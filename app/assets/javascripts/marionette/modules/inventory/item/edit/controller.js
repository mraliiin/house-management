HousePad.TradeApp.module("Inventory.Item.Edit", function(Edit, TradeApp, Backbone, Marionette, $, _){

    Edit.Controller = {
        show: function(){
            this.inventory_item = Backbone.Radio.request("app:data", "inventory_item");

            this.layout = new Edit.EditLayout({model: this.inventory_item});
            TradeApp.Layout.getRegion("main_panel").show(this.layout);

            this.itemTitleView = new Edit.ItemTitleView({model: this.inventory_item});
            this.layout.getRegion("item_title").show(this.itemTitleView);

            this.itemSaveView = new Edit.ItemSaveView({model: this.inventory_item});

            this.itemSaveView.on("inventory-item:save", Edit.Controller.saveItem);

            this.itemSaveView.on("inventory-item:cancel-edit", function(){
                Edit.Controller.redirectToList();
            });

            this.itemSaveView.on("inventory-item:review", function(){
                Edit.Controller.itemSaveView.showProgress();
                Edit.Controller.itemSaveView.hideItemFeedback();

                var inventory_item = Edit.Controller.setCustomFields();

                var validation = Edit.Controller.validateInputs(inventory_item);

                if (!validation.isValid) {
                    Edit.Controller.itemSaveView.hideProgress();
                    Edit.Controller.itemSaveView.showFailedSaveMessage(validation.message);
                    return;
                }

                TradeApp.module("Inventory.Item.Edit.Review").stop();
                TradeApp.module("Inventory.Item.Edit.Review").start();
            });

            this.layout.getRegion("item_save").show(this.itemSaveView);

            Edit.Controller.startModules();

            Edit.Controller.bindAccordionEvents();
        },

        saveItem: function(){
            Edit.Controller.itemSaveView.showProgress();
            Edit.Controller.itemSaveView.hideItemFeedback();

            var inventory_item = Edit.Controller.setCustomFields();

            var validation = Edit.Controller.validateInputs(inventory_item);

            if (!validation.isValid) {
                Edit.Controller.itemSaveView.hideProgress();
                Edit.Controller.itemSaveView.showFailedSaveMessage(validation.message);
                return;
            }

            var save_promise = inventory_item.save();
            if (save_promise) {
                $.when(save_promise).done(function(){
                    Edit.Controller.itemSaveView.hideProgress();
                    Edit.Controller.itemSaveView.showSuccessfulSaveMessage();

                    $("#page-overlay").show();
                    Edit.Controller.redirectToList();
                });
                $.when(save_promise).fail(function () {
                    Edit.Controller.itemSaveView.hideProgress();
                    Edit.Controller.itemSaveView.showFailedSaveMessage();
                });
            } else {
                Edit.Controller.itemSaveView.hideProgress();
                Edit.Controller.itemSaveView.showFailedSaveMessage();
            }
        },

        validateInputs : function(inventory_item) {
            var response = { isValid : true };

            if($('#item-title').val() == '' || $('#item-title').val() == null) {
                return  { message: 'Title is required!', isValid: false };
            }

            // Nothing requested - all good
            var requested_sections = inventory_item.get('requested_item_sections');
            if(!inventory_item.get('request_sections') || !requested_sections) return response;

            // Using FOR to break on first error
            for (var i = 0; i < requested_sections.length; ++i) {
                var section = requested_sections[i];

                if (section['required'] && Edit.Controller._itemHasEmptyValue(inventory_item, section['identifier'])) {
                    return { message: section['name'] + ' section is required!', isValid: false};
                    break;
                }
            }

            return response;
        },

        _itemHasEmptyValue: function(item, section) {
            var itemField = '';
            switch (section) {
                case "images":
                    itemField = ("inventory_images");
                    break;

                case "categories":
                    itemField = ("inventory_categories");
                    break;

                case "measurements":
                    itemField = ("inventory_dimensions_attributes");
                    break;

                case "conditions":
                    itemField = ("condition_id");
                    break;

                case "periods":
                    itemField = ("period_id");
                    break;

                case "care":
                    itemField = ("inventory_care_docs");
                    break;

                case "provenance":
                    itemField = ("inventory_provenance_docs");
                    break;

                case "invoice":
                    itemField = ("inventory_invoice_docs");
                    break;

                case "warranty":
                    itemField = ("inventory_warranty_docs");
                    break;
                default:
            }

            // Trickier with the measurements
            if (section == 'measurements' && itemField && item.get(itemField)) {
                var hasElementsToAdd  = false;
                _.each(item.get(itemField), function(measurement) {
                    // Measurements sent for delete don't have value
                    if (measurement.value) {
                        hasElementsToAdd = true;
                    }
                })

                // Meaning the user removed all the measurements despite it is a required field
                if (!hasElementsToAdd) return true;
            }

            return itemField && (!item.get(itemField) || item.get(itemField).length == 0);
        },

        setCustomFields: function(){
            var inventory_item = Backbone.Radio.request("app:data", "inventory_item");

            inventory_item.set({
                title: $("#item-title").val(),
                description: $("#item-description").val(),
                provenance_description: $("#item-provenance_description").val(),
                care: $("#item-care").val(),
                quantity: 0,
                inventory_category_id: 1,
                tmp: false,
                condition_id: null,
                condition_description: null,
                period_id: null,
                period_description: null
            });

            var periods = inventory_item.get("inventory_periods");
            if( periods && periods.length > 0 ) {
                var period = periods.models[0];
                inventory_item.set({
                    period_id: period.get('id'),
                    period_description: $("#period_description").val(),
                });
            }

            var conditions = inventory_item.get("inventory_conditions");
            if( conditions && conditions.length > 0 ) {
                var condition = conditions.models[0];
                inventory_item.set({
                    condition_id: condition.get('id'),
                    condition_description: $('#condition_description').val(),
                });
            }

            // Add dimensions
            Edit.Controller.addInventoryDimensions(inventory_item);

            Backbone.Radio.command("app:data", "set_inventory_item", inventory_item);

            return inventory_item;
        },

        addInventoryDimensions: function(inventory_item){
            var measurements = Backbone.Radio.request("app:data", "measurements");

            var inventory_dimensions_attributes = [];
            var current_measurements = measurements.get('current_measurements');

            if (current_measurements && current_measurements.length > 0){
                current_measurements.forEach(function(measurement){
                    if(measurement.isDeleted) {
                        inventory_dimensions_attributes.push({
                            id: measurement.id,
                            '_destroy': "1",
                        })
                    } else {
                        var tempDimension = {
                            id: measurement.id || null,
                            inventory_dimension_unit_id: measurement.unit_id,
                            inventory_dimension_type_id: measurement.dimension_type_id,
                            value: measurement.dimension_value,
                        };

                        if (measurement.id) {
                            tempDimension.id = parseInt(measurement.id)
                        }

                        if (measurement.fraction_id){
                            tempDimension.inventory_fraction_id = parseInt(measurement.fraction_id)
                        }

                        inventory_dimensions_attributes.push(tempDimension)
                    }
                });
            }

            inventory_item.set("inventory_dimensions_attributes", inventory_dimensions_attributes);

            return inventory_item;
        },

        createTemporaryInventoryItem: function(){
            var inventory_item = Backbone.Radio.request("app:data", "inventory_item");

            if (inventory_item.get('house_id') && inventory_item.get('room_id')) {
                var save_promise = inventory_item.save({tmp: true});
                if (save_promise) {
                    $.when(save_promise).done(function(){
                        var Models = HousePad.TradeApp.module("Models");
                        inventory_item.set("inventory_images", new Models.InventoryImages());
                        inventory_item.set("inventory_categories", new Models.InventoryCategories());
                        inventory_item.set("inventory_conditions", new Models.InventoryConditions());
                        inventory_item.set("inventory_periods", new Models.InventoryPeriods());
                        inventory_item.set("inventory_care_docs", new Models.InventoryDocuments());
                        inventory_item.set("inventory_warranty_docs", new Models.InventoryDocuments());
                        inventory_item.set("inventory_invoice_docs", new Models.InventoryDocuments());
                        inventory_item.set("inventory_materials", new Models.InventoryMaterials());
                        inventory_item.set("inventory_provenance_docs", new Models.InventoryDocuments());

                        Backbone.Radio.command("app:data", "set_inventory_item", inventory_item);

                        Edit.Controller.show();
                    });
                    $.when(save_promise).fail(function () {
                        Edit.Controller.showFailedNewItemView();
                    });
                } else {
                    Edit.Controller.showFailedNewItemView();
                }
            }
        },

        showFailedNewItemView: function(){
            this.layout = new Edit.EditLayout();
            TradeApp.Layout.getRegion("main_panel").show(this.layout);

            this.failedNewItemView = new Edit.FailedNewItemView();
            this.layout.getRegion("item_title").show(this.failedNewItemView);
        },

        redirectToList: function() {
            var redirect_to = "/trade/inventory";

            var house_id = parseInt(Edit.Controller.inventory_item.get("house_id"));
            var room_id = parseInt(Edit.Controller.inventory_item.get("room_id"));

            if ( house_id > 0 ) {
                redirect_to += '?project=' + house_id;
                if (room_id > 0) redirect_to += '&room=' + room_id;
            }

            window.location.href = redirect_to;
        },

        startModules : function(){
            //(re)Start Item images module
            TradeApp.module("Inventory.Item.Edit.Images.List").stop();
            TradeApp.module("Inventory.Item.Edit.Images.List").start({region: this.layout.getRegion("item_images")});

            //(re)Start Item add images module
            TradeApp.module("Inventory.Item.Edit.Images.Add").stop();
            TradeApp.module("Inventory.Item.Edit.Images.Add").start({region: this.layout.getRegion("item_add_images")});

            //(re)Start Item categories module
            TradeApp.module("Inventory.Item.Edit.Categories.List").stop();
            TradeApp.module("Inventory.Item.Edit.Categories.List").start({region: this.layout.getRegion("item_categories")});

            //(re)Start Item add categories module
            TradeApp.module("Inventory.Item.Edit.Categories.Add").stop();
            TradeApp.module("Inventory.Item.Edit.Categories.Add").start({region: this.layout.getRegion("item_add_categories")});

            // Materials
            TradeApp.module("Inventory.Item.Edit.Materials.Add").stop();
            TradeApp.module("Inventory.Item.Edit.Materials.Add").start({region: this.layout.getRegion("item_add_materials")});
            TradeApp.module("Inventory.Item.Edit.Materials.List").stop();
            TradeApp.module("Inventory.Item.Edit.Materials.List").start({region: this.layout.getRegion("item_materials")});

            // Condition
            TradeApp.module("Inventory.Item.Edit.Conditions.List").start({region : this.layout.getRegion("item_add_conditions")});
            TradeApp.module("Inventory.Item.Edit.Conditions.Add").start({region: this.layout.getRegion("item_conditions")});

            // Periods
            TradeApp.module("Inventory.Item.Edit.Periods.List").start({region : this.layout.getRegion("item_add_periods")});
            TradeApp.module("Inventory.Item.Edit.Periods.Add").start({region: this.layout.getRegion("item_periods")});

            // Measurements
            TradeApp.module("Inventory.Item.Edit.Measurements.List").start({region : this.layout.getRegion("item_add_measurements")});
            TradeApp.module("Inventory.Item.Edit.Measurements.Add").start({region: this.layout.getRegion("item_measurements")});

            //(re)Start Item Care module
            TradeApp.module("Inventory.Item.Edit.Care").stop();
            TradeApp.module("Inventory.Item.Edit.Care").start({region: this.layout.getRegion("item_care")});

            //(re)Start Item Warranty module
            TradeApp.module("Inventory.Item.Edit.Warranty").stop();
            TradeApp.module("Inventory.Item.Edit.Warranty").start({region: this.layout.getRegion("item_warranty")});

            //(re)Start Item Invoice module
            TradeApp.module("Inventory.Item.Edit.Invoice").stop();
            TradeApp.module("Inventory.Item.Edit.Invoice").start({region: this.layout.getRegion("item_invoice")});

            // Provenance
            TradeApp.module("Inventory.Item.Edit.Provenance").stop();
            TradeApp.module("Inventory.Item.Edit.Provenance").start({region: this.layout.getRegion("item_provenance")});
        },

        bindAccordionEvents: function(){
            $('#accordion > h3').click(function() {
                $(this).next('div').toggleClass("hidden");
            });
        }
    }
});
