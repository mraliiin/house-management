require "rails_helper"

describe UsersController, type: :controller do

  describe "#update/:id" do

    context "when making an html request" do
      context "when not logged in" do
        it "redirects to the login page" do
          put :update, id: 10
          expect(response).to have_http_status(302)
          expect(response).to redirect_to(login_path)
        end
      end

      context "when logged in" do
        before do
          login
        end

        it "responds with HTTP status not acceptable" do
          put :update, id: 10
          expect(response).to have_http_status(406)
        end
      end

    end


    context "when making a json request" do

      before do
        request.headers["Accept"] = "application/json"
      end

      context "when not logged in" do
        it "responds with HTTP status not authorized" do

          put :update, id: 10
          expect(response).to have_http_status(401)
        end
      end


      context "when logged in" do

        before do
          login
        end


        context "with correct user id" do
          it "responds with HTTP status no content" do

            put :update, id: @user.id, first_name: "Adrian Rspec"
            expect(response).to have_http_status(204)

          end
        end

      end
    end


  end

end
