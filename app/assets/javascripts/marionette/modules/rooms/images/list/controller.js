HousePad.TradeApp.module("Rooms.Images.List", function (List, TradeApp, Backbone, Marionette, $, _) {

    List.Controller = {

        show: function () {
            if (List.Controller.region) {

                this.room = Backbone.Radio.request("app:data", "room");
                this.listView = new List.ListView({collection: this.room.get("snapshots")});

                this.listView.on("images:delete", function (image_id) {

                    var image = this.collection.get(image_id);
                    var delete_promise = image.destroy();
                    if (delete_promise) {
                        $.when(delete_promise).done(function () {
                            List.Controller.room.get("snapshots").remove(image, {silent: true});
                            List.Controller.show();
                        });
                        $.when(delete_promise).fail(function () {
                            //this.showErrorFeedback("Failed to delete image.");
                        });
                    } else {
                        //this.showErrorFeedback("Failed to delete image.");
                    }
                });

                List.Controller.region.show(this.listView);

                this.createRoomImagesDropzone();
            }

            Backbone.Radio.on("images", "reorder", function () {
                var image_ids = new Array();
                $(".room-image-container").map(function (idx, img) {
                    image_ids.push($(img).data("id"));
                });

                var save_promise = $.post("/trade/homes/" + List.Controller.room.get("house_id") + "/rooms/" + List.Controller.room.id + "/reorder_images", {image_ids: image_ids});
                if (save_promise) {
                    $.when(save_promise).done(List.Controller.completeReorderImages);
                    $.when(save_promise).fail(function () {
                        List.Controller.listView.render();
                    });
                } else {
                    List.Controller.listView.render();
                }
            });
        },

        completeReorderImages: function () {
            var image_ids = new Array();
            $(".room-image-container").map(function (idx, img) {
                image_ids.push($(img).data("id"));
            });

            //Make sure the snapshot models are in the order of image ids
            for (var i = 0; i < image_ids.length; i++) {
                var img_id = image_ids[i];
                var img = List.Controller.room.get("snapshots").get(img_id);
                List.Controller.room.get("snapshots").remove(img);
                List.Controller.room.get("snapshots").add(img, {at: i});
            }
        },

        createRoomImagesDropzone: function () {
            var room_image_preview = $("#room-image-preview-template");
            var room_image_preview_template = room_image_preview.parent().html();
            $("#room-image-preview-template").parent().remove();
            var room = Backbone.Radio.request("app:data", "room");

            this.roomImagesDropzone = new Dropzone(
                "#room-images-dropzone",
                {
                    url: "/trade/homes/" + room.get("house_id") + "/rooms/" + room.get("id") + "/upload_room_image", // Set the url
                    thumbnailWidth: 150,
                    thumbnailHeight: 150,
                    parallelUploads: 20,
                    maxFilesize: 5,
                    maxFiles: 10,
                    previewTemplate: room_image_preview_template,
                    //autoQueue: false, // Make sure the files aren't queued until manually added
                    //previewsContainer: "#room-images-dropzone", // Define the container to display the previews
                    clickable: "#room-images-dropzone" // Define the element that should be used as click trigger to select files.
                });

            this.roomImagesDropzone.on("success", function (file, response) {
                //Remove the uploaded file so the dropzone can be reused
                List.Controller.roomImagesDropzone.removeFile(file);
                Backbone.Radio.command("room", "reload");

                List.Controller.reloadImages();
            });

            this.roomImagesDropzone.on("error", function (file, errorMessage, xhr) {
                //Remove the uploaded file so the dropzone can be reused
                List.Controller.roomImagesDropzone.removeFile(file);

                $("#room-image-upload-feedback").html("Failed to upload images.");
                $("#room-image-upload-feedback").addClass("alert-danger");
                $("#room-image-upload-feedback").removeClass("alert-success");
                $("#room-image-upload-feedback").show();
            });

            this.roomImagesDropzone.on("addedfile", function (file) {
                $("#room-image-upload-feedback").hide();
            });
        },

        reloadImages: function () {
            var room = Backbone.Radio.request("app:data", "room");
            var room_with_images = Backbone.Radio.request("models:images", "new", room.get('house_id'), room.id);

            var fetch_promise = room_with_images.fetch();

            if (fetch_promise) {
                $.when(fetch_promise).done(function () {
                    var Models = HousePad.TradeApp.module("Models");

                    var snapshots = new Models.RoomImages(room_with_images.get('snapshots'))
                    snapshots.forEach(function (snapshot) {
                        var snapshot_notes = new Models.RoomImageNotes(snapshot.get("snapshot_notes"));
                        snapshot.set("snapshot_notes", snapshot_notes);
                    });

                    room.set("snapshots", snapshots);

                    Backbone.Radio.command("app:data", "set_room", room);
                    List.Controller.show();
                });
            }
        },
    }
});
