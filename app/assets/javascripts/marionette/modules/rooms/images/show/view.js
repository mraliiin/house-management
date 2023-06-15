HousePad.TradeApp.module("Rooms.Images.Show", function(Show, TradeApp, Backbone, Marionette, $, _){

    Show.ShowView = Marionette.ItemView.extend({
        template: "#room-image-template",
        tagName: "div",
        className: "modal-dialog",

        ui: {
            btn_add_note: ".btn-add-note",
            room_image_large: ".room-image-large",
            btn_save_note: ".btn-save-note" ,
            btn_del_note: ".btn-del-note",
            btn_edit_note: ".btn-edit-note",
            btn_cancel_edit_note: ".btn-cancel-edit-note",
            btn_update_note: ".btn-update-note"

            //btn_add_image: ".btn-add-image",
            //btn_save_image: "#btn-save-image",
            //btn_delete_image: ".btn-delete-image",
            //room_image: ".room-image"
        },

        triggers: {
            "click @ui.btn_add_note": "image:add-note",
            "click @ui.btn_save_note": "image:save-note"
            //"click @ui.btn_add_room": "images:add-image",
            //"click @ui.btn_save_room": "images:save-image"
        },

        events: {
            "click @ui.room_image_large": "pickNoteLocation",
            "click @ui.btn_del_note": "deleteNote",
            "click @ui.btn_edit_note": "editNote",
            "click @ui.btn_cancel_edit_note": "cancelEditNote",
            "click @ui.btn_update_note": "updateNote"
            //"click @ui.btn_save_note": "saveNote"
            //"click @ui.btn_delete_image": "deleteImage",
            //"click @ui.room_image": "viewImageDetails"
        },

        onRender: function(){
            this.placeNotes();

            $("#room-image-notes-container").sortable({update: function(){
                Backbone.Radio.trigger("image", "reorder-notes");
            }})
        },

        onShow: function(){
            $("#room-image-notes-container").sortable({update: function(){
                Backbone.Radio.trigger("image", "reorder-notes");
            }})
        },

        placeNotes: function(){
            if ( Show.Controller.snapshot_displayed == true ) {
                var image = document.getElementById("room-image-large");

                // Move the room notes indicators in the right positions
                for (var i = 0; i < Show.Controller.room_image.get("snapshot_notes").length; i++) {
                    var note = Show.Controller.room_image.get("snapshot_notes").at(i);

                    $("#room-image-note-indicator-" + (i + 1))
                        .css("top", (image.clientHeight * parseFloat(note.get("ordinate")))-15 + "px");
                    $("#room-image-note-indicator-" + (i + 1))
                        .css("left", (image.clientWidth * parseFloat(note.get("abscissa")))-15 + "px");
                }

                $(".room-image-note-indicator").draggable({
                    containment: $("#room-image-large"),
                    stop: function (event, ui) {
                        var position = {
                            x: ((ui.position.left+15) / image.clientWidth),
                            y: ((ui.position.top+15) / image.clientHeight)
                        };
                        var note_id = ui.helper.data("id");
                        Show.Controller.updateNotePosition(note_id, position);
                    }
                });
            }
        },

        pickNoteLocation: function(e){
            var image = document.getElementById("room-image-large");
            var position = {x: (e.offsetX/image.clientWidth), y: (e.offsetY/image.clientHeight)};
            this.trigger("image:pick-location", position);
        },

        editNote: function(e){
            e.stopPropagation();
            var note_id = $(e.currentTarget).data("id");
            this.trigger("image:edit-note", note_id);
        },

        cancelEditNote: function(e){
            e.stopPropagation();
            var note_id = $(e.currentTarget).data("id");
            this.trigger("image:cancel-edit-note", note_id);
        },

        updateNote: function(e){
            e.stopPropagation();
            var note_id = $(e.currentTarget).data("id");
            this.trigger("image:update-note", note_id);
        },

        deleteNote: function(e){
            e.stopPropagation();
            var note_id = $(e.currentTarget).data("id");
            this.trigger("image:del-note", note_id);
        },

        showFailedUpdateNoteMessage: function(note_id){
            $("#input-note-message"+note_id).parent().addClass("has-error");
        },

        showFailedSaveNoteMessage: function(response){
            if (typeof response.responseJSON != "undefined" &&
                typeof response.responseJSON.error != "undefined") {
                this.showErrorFeedback(response.responseJSON.error);
            }
            else if (response.status != 200) {
                this.showErrorFeedback("Failed to save note.");
            }
        },

        showFailedDeleteNoteMessage: function(response){
            this.showErrorFeedback("Failed to delete note.");
        },

        showErrorFeedback: function(error_message){
            $("#new-note-feedback").addClass("alert-danger");
            $("#new-note-feedback").removeClass("alert-success");
            $("#new-note-feedback").html(error_message);
            $("#new-note-feedback").show();
        }

    });
});