HousePad.TradeApp.module("Settings.AccountDetails.Avatar", function(Avatar, TradeApp, Backbone, Marionette, $, _) {

    Avatar.Controller = {
        show: function () {

            current_user = Backbone.Radio.request("app:data", "current_user");

            this.avatarView = new Avatar.AvatarView({model: new Backbone.Model({current_user: typeof current_user != "undefined" ? current_user.toJSON() : null})});


            this.avatarView.on("avatar:reset", function(){
                //var current_user = Backbone.Radio.request("app:data", "current_user");
                //if (current_user.avatar_thumb_url) {
                //    $("#avatar img").src(current_user.avatar_thumb_url);
                //} else {
                //    $("#avatar img").remove();
                //    $("#avatar").append("<div id='avatar-placeholder'>No avatar</div>");
                //}
                //
                //$("#avatar-actions").hide();
                //$("#btn-change-avatar").removeAttr("disabled");
                AccountInfo.stop();
                AccountInfo.start();
            });

            this.avatarView.on("avatar:update", function(){
                Avatar.Controller.avatarView.showProgress();

                var current_user = Backbone.Radio.request("app:data", "current_user");

                var avatar = current_user.get("avatar");
                avatar.thumb.old_url = avatar.thumb.url;
                avatar.old_url = avatar.url;
                //current_user.set("remote_avatar_url", $("#avatar img").attr("src"));

                var promise = current_user.save({remote_avatar_url: $("#avatar img").attr("src")}, {patch: true});
                if (promise) {
                    $.when(promise).done(function(){
                        Avatar.Controller.avatarView.hideProgress();
                        Avatar.Controller.avatarView.showSuccessfulUpdateMessage();
                    });
                    $.when(promise).fail(function(user_data){
                        Avatar.Controller.avatarView.hideProgress();
                        Avatar.Controller.avatarView.showAvatarFailedUpdateMessage(user_data);

                        avatar.thumb.url = avatar.thumb.old_url;
                        avatar.url = avatar.old_url;
                    });
                } else {
                    Avatar.Controller.avatarView.hideProgress();
                    Avatar.Controller.avatarView.showErrorFeedback("Failed to update avatar.");

                    avatar.thumb.url = avatar.thumb.old_url;
                    avatar.url = avatar.old_url;
                }


                $("#avatar-actions").hide();
                $("#btn-change-avatar").removeAttr("disabled");
            });


            //Render avatar view
            TradeApp.module("Settings.AccountDetails").Controller.Layout.getRegion("account_avatar").show(this.avatarView);

            //Create avatar Dropzone
            this.createAvatarDropzone();
        },


        createAvatarDropzone: function(){
            var avatar_preview = $("#avatar-preview-template");
            var avatar_preview_template = avatar_preview.parent().html();
            $("#avatar-preview-template").parent().remove();
            this.avatarDropzone = new Dropzone("#avatar-container", {
                url: "/trade/users/upload_avatar", // Set the url
                thumbnailWidth: 150,
                thumbnailHeight: 150,
                parallelUploads: 20,
                maxFilesize: 5,
                maxFiles: 1,
                previewTemplate: avatar_preview_template,
                //autoQueue: false, // Make sure the files aren't queued until manually added
                previewsContainer: "#avatar", // Define the container to display the previews
                clickable: "#btn-change-avatar" // Define the element that should be used as click trigger to select files.
            });

            this.avatarDropzone.on("addedfile", function(file){
                $("#btn-change-avatar").attr("disabled", "disabled");
            });

            this.avatarDropzone.on("success", function(file, response){
                //Remove the uploaded file so the dropzone can be reused
                Avatar.Controller.avatarDropzone.removeFile(file);

                $("#avatar img").remove();
                $("#avatar #avatar-placeholder").remove();
                $("#avatar #avatar-preview-template").remove();

                $("#avatar").append("<img src='"+response.avatar.thumb.url+"'/>");
                $("#avatar-actions").show();
            });

            this.avatarDropzone.on("error", function(file, errorMessage, xhr){
                //Remove the uploaded file so the dropzone can be reused
                Avatar.Controller.avatarDropzone.removeFile(file);

                $("#avatar #avatar-preview-template .progress .progress-bar").addClass("progress-bar-danger");
                $("#avatar #avatar-preview-template .progress .progress-bar").removeClass("progress-bar-success");

                $("#avatar #avatar-preview-template").remove();

                $("#avatar-actions").hide();

            });
        }
    }
});



