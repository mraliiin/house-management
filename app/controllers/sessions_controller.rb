class SessionsController < ApplicationController

  skip_before_filter :require_login
  before_filter :enforce_json_format, only: [:create]

  def new
    if cookies["housepad-token"]
      redirect_to root_url
    end
  end

  def create
    if params[:email].blank? || params[:password].blank?
      render_json_error('Incorrect login or password.')
      return
    end

    @user = HouseManagementApi::Session.login(params[:email], params[:password])
    if @user.nil?
      render_json_error('Incorrect login or password.', :unauthorized)
    else
      @housepad_cookie = @user.get_user_cookie
      @redirect_path = cookies["housepad-path"].blank? ? root_path : cookies["housepad-path"]
    end
  end


  def register
    if cookies["housepad-token"]
      redirect_to root_url
    end
  end


  def destroy
    logout
    redirect_to :login
  end
end
