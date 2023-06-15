require "rails_helper"

describe SessionsController, type: :controller do

  describe "#new" do

    context "when not logged in" do
      it "responds with HTTP status 200" do

        get :new
        expect(response).to have_http_status(200)
      end
    end


    context "when logged in" do

      before do
        login
      end


      it "responds with HTTP status redirect and redirects to the homepage" do

        get :new

        expect(response).to have_http_status(302)
        expect(response).to redirect_to(root_path)

      end

    end

  end


  describe "#create" do

    context "when making a text/html request" do
      it "responds with HTTP status not acceptable" do
        post :create
        expect(response).to have_http_status(406)
      end
    end


    context "when making a json request" do

      before do
        request.headers["Accept"] = "application/json"
      end


      context "when no email or password are posted" do
        it "responds with HTTP status unprocessable entity" do
          post :create
          expect(response).to have_http_status(422)
        end
      end


      context "when posting incorrect information" do
        it "responds with HTTP status unauthorized" do
          post :create, {email: "gigi@gmail.com", password: "123"}
          expect(response).to have_http_status(401)
        end
      end


      context "when posting correct information" do
        it "responds with HTTP status ok" do
          post :create, {email: "gigi@gmail.com", password: "12345678"}
          expect(response).to have_http_status(200)
        end
      end

      context "when passing a housepad-path cookie" do
        render_views

        it "should be sent back in the response" do
          request.headers["Cookie"] = "housepad-path=adrian"
          post :create, {email: "gigi@gmail.com", password: "12345678"}
          expect(response.body).to have_text("adrian")
        end
      end

    end
  end



  describe "#destroy" do
    it "should redirect the login page" do
      delete :destroy
      expect(response).to have_http_status(302)
      expect(response).to redirect_to(login_path)
    end
  end

end
