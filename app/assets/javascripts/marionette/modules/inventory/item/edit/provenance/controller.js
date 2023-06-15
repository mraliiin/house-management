HousePad.TradeApp.module("Inventory.Item.Edit.Provenance", function (Provenance, TradeApp, Backbone, Marionette, $, _) {

    Provenance.Controller = {

        show: function () {
            if (Provenance.Controller.region) {
                this.inventory_item = Backbone.Radio.request("app:data", "inventory_item");
                this.provenanceView = new Provenance.ProvenanceView({model: this.inventory_item});
                Provenance.Controller.region.show(this.provenanceView);
                this.createProvenanceDropZone();
            }
        },

        createProvenanceDropZone: function () {
            var item_provenance_preview = $("#item-provenance-preview-template");
            var item_provenance_preview_template = item_provenance_preview.parent().html();
            $("#item-provenance-preview-template").parent().remove();

            var upload_url = "/trade/inventory-items/"
                + Provenance.Controller.inventory_item.get("id")
                + "/upload_provenance_document";

            if (Provenance.Controller.inventory_item.get("edit_with_token")) {
                upload_url += "?token=" + Provenance.Controller.inventory_item.get("token");
            }

            this.itemProvenanceDropzone = new Dropzone(
                "#inventory-item-provenance-dropzone",
                {
                    url: upload_url, // Set the url
                    thumbnailWidth: 150,
                    thumbnailHeight: 150,
                    parallelUploads: 20,
                    maxFilesize: 5,
                    maxFiles: 10,
                    previewTemplate: item_provenance_preview_template,
                    clickable: "#inventory-item-provenance-dropzone"
                });

            this.itemProvenanceDropzone.on("success", function (file, response) {
                // Remove the uploaded file so the drop zone can be reused
                Provenance.Controller.itemProvenanceDropzone.removeFile(file);
                Backbone.Radio.command("inventory_provenance", "reload");
            });

            this.itemProvenanceDropzone.on("error", function (file, errorMessage, xhr) {
                // Remove the uploaded file so the drop zone can be reused
                Provenance.Controller.itemProvenanceDropzone.removeFile(file);

                Provenance.Controller.provenanceView.showErrorFeedback("Failed to upload provenance document");
            });

            this.itemProvenanceDropzone.on("addedfile", function (file) {
                Provenance.Controller.provenanceView.hideErrorFeedback();
            });
        },

        reloadProvenanceDocs: function () {
            var load_promise = $.get("/trade/inventory-items/"
                + Provenance.Controller.inventory_item.id
                + "/provenance_documents", { token: Provenance.Controller.inventory_item.get("token") });

            if (load_promise) {
                $.when(load_promise).done(function (docs) {
                    var Models = TradeApp.module("Models");
                    Provenance.Controller.inventory_item.set("inventory_provenance_docs", new Models.InventoryImages(docs));
                    Provenance.Controller.show();
                });
            }
        },

        deleteItemDoc: function (doc_id) {
            if (!confirm("Are you sure?")) return;

            var doc = Provenance.Controller.inventory_item.get("inventory_provenance_docs").get(doc_id);

            Provenance.Controller.provenanceView.hideErrorFeedback();
            var delete_promise = doc.destroy({
                data: { token: Provenance.Controller.inventory_item.get("token") },
                processData: true
            });

            if (delete_promise) {
                $.when(delete_promise).done(function () {
                    Provenance.Controller.inventory_item.get("inventory_provenance_docs").remove(doc, {silent: true});
                    Provenance.Controller.show();
                });
                $.when(delete_promise).fail(function () {
                    Provenance.Controller.provenanceView.showErrorFeedback("Failed to delete provenance document.");
                });
            } else {
                Provenance.Controller.provenanceView.showErrorFeedback("Failed to delete provenance document.");
            }
        }
    }
});
