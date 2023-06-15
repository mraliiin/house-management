require "rails_helper"

describe SettingsController, type: :controller do

  describe "#index" do

    context "when not logged in" do
      it "responds with HTTP status 302" do

        get :index
        expect(response).to have_http_status(302)
        expect(response).to redirect_to(login_path)
      end
    end


    context "when logged in" do

      before do
        login
      end


      it "responds with HTTP status ok" do

        get :index
        expect(response).to have_http_status(200)

      end

    end

  end

end
