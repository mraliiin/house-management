HousePad.TradeApp.module("Rooms.Images.Show", function(Show, TradeApp, Backbone, Marionette, $, _){

    Show.Controller = {

        show: function(){
            Show.Controller.snapshot_displayed = false;

            this.room_image.set("add_note_mode", false);

            this.room_image.exit_edit_mode();

            this.showView = new Show.ShowView({model: this.room_image});
            this.region.show(this.showView);

            this.showView.on("image:add-note", function(){
                Show.Controller.room_image.set("add_note_mode", true);
                $(".add-note-instructions").show();
                $(".room-image-large").css("cursor", "pointer");
            });

            this.showView.on("image:pick-location", function(position){

                if (Show.Controller.room_image.get("add_note_mode") == true) {
                    Show.Controller.room_image.set("note_position", position);
                    //$(".add-note-instructions").hide();
                    //$(".add-note").show();
                    Show.Controller.showView.render();
                    Show.Controller.showView.bindUIElements();
                }
            });

            this.showView.on("image:save-note", function(){
                var roomImageNote = Backbone.Radio.request("models:room_image_note", "new");
                roomImageNote.set("snapshot_id", Show.Controller.room_image.id);
                roomImageNote.set("abscissa", Show.Controller.room_image.get("note_position")["x"]);
                roomImageNote.set("ordinate", Show.Controller.room_image.get("note_position")["y"]);
                roomImageNote.set("message", $(".input-add-note").val());

                /*return;*/

                var save_promise = roomImageNote.save();
                if (save_promise) {
                    $.when(save_promise).done(Show.Controller.completeSaveNewNote);
                    $.when(save_promise).fail(function (room_data) {
                        //Show.Controller.showView.hideSaveNoteProgress();
                        Show.Controller.showView.showFailedSaveNoteMessage();
                    });
                } else {
                    //Show.Controller.showView.hideSaveNoteProgress();
                    Show.Controller.showView.showFailedSaveNoteMessage();
                }
            });

            this.showView.on("image:del-note", function(note_id){

                var roomImageNote = Show.Controller.room_image.get("snapshot_notes").get(note_id);

                var save_promise = roomImageNote.destroy();
                if (save_promise) {
                    $.when(save_promise).done(Show.Controller.reloadNotes);
                    $.when(save_promise).fail(function (room_data) {
                        //Show.Controller.showView.hideSaveNoteProgress();
                        Show.Controller.showView.showFailedDeleteNoteMessage();
                    });
                } else {
                    //Show.Controller.showView.hideSaveNoteProgress();
                    Show.Controller.showView.showFailedDeleteNoteMessage();
                }
            });

            this.showView.on("image:edit-note", function(note_id){
                var roomImageNote = Show.Controller.room_image.get("snapshot_notes").get(note_id);
                roomImageNote.set("edit_mode", true);
                Show.Controller.showView.render();
            });

            this.showView.on("image:cancel-edit-note", function(note_id){
                var roomImageNote = Show.Controller.room_image.get("snapshot_notes").get(note_id);
                roomImageNote.set("edit_mode", false);
                Show.Controller.showView.render();
            });

            this.showView.on("image:update-note", function(note_id){
                var roomImageNote = Show.Controller.room_image.get("snapshot_notes").get(note_id);

                roomImageNote.set("message", $("#input-note-message-"+note_id).val());
                var save_promise = roomImageNote.save();
                if (save_promise) {
                    $.when(save_promise).done(Show.Controller.reloadNotes);
                    $.when(save_promise).fail(function (room_data) {
                        Show.Controller.showView.showFailedUpdateNoteMessage();
                    });
                } else {
                    //Show.Controller.showView.hideSaveNoteProgress();
                    Show.Controller.showView.showFailedUpdateNoteMessage();
                }
            });

            Backbone.Radio.on("image", "reorder-notes", function(){
                var note_ids = new Array();
                $(".room-image-note").map(function(idx, note){
                    note_ids.push($(note).data("id"));
                });

                var save_promise = $.post("/trade/room_images/"+Show.Controller.room_image.id+"/reorder_notes", {note_ids: note_ids});
                if (save_promise) {
                    $.when(save_promise).done(Show.Controller.completeReorderNotes);
                    $.when(save_promise).fail(function () {
                        Show.Controller.showView.render();
                    });
                } else {
                    Show.Controller.showView.render();
                }
            });

            $("#room-image-modal").on("shown.bs.modal", function(){
                Show.Controller.snapshot_displayed = true;
                Show.Controller.showView.placeNotes();
            }).modal('show');
        },

        completeReorderNotes: function(){
            var note_ids = new Array();
            $(".room-image-note").map(function(idx, note){
                note_ids.push($(note).data("id"));
            });

            //Make sure the snapshot models are in the order of image ids
            for (var i=0; i<note_ids.length; i++){
                var note_id = note_ids[i];
                var note = Show.Controller.room_image.get("snapshot_notes").get(note_id);
                Show.Controller.room_image.get("snapshot_notes").remove(note);
                Show.Controller.room_image.get("snapshot_notes").add(note, {at: i});
            }
            Show.Controller.showView.render();
        },

        completeSaveNewNote: function(a, b, c){

            Show.Controller.room_image.set("add_note_mode", false);
            Show.Controller.room_image.unset("note_position");
            //Show.Controller.showView.showSuccessfulSaveMessage();
            //$('#new-room-modal').modal("hide");
            //Backbone.Radio.command("room:notes", "reload");
            //TradeApp.module("Homes.Rooms.New").stop();
            Show.Controller.reloadNotes();
        },

        reloadNotes: function(){
            //var room = Backbone.Radio.request("app:data", "room");
            var fetch_promise = Show.Controller.room_image.fetch();

            if (fetch_promise) {
                $.when(fetch_promise).done(function(){
                    //turn the array loaded from json into a Backbone Collection
                    var Models = TradeApp.module("Models");
                    Show.Controller.room_image.set("snapshot_notes", new Models.RoomImageNotes(Show.Controller.room_image.get("snapshot_notes")));
                    Show.Controller.showView.render();
                });
            }
        },

        updateNotePosition: function(note_id, position){
            var note = Show.Controller.room_image.get("snapshot_notes").get(note_id);
            note.set("abscissa", position.x);
            note.set("ordinate", position.y);
            note.save();
        }
    }
});
