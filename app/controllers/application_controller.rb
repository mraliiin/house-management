class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  # protect_from_forgery with: :exception unless Rails.env.test?
  # protect_from_forgery with: :null_session #unless Rails.env.test?

  before_filter :require_login


  def logout
    cookies.delete "housepad-token"
  end

  private

  # render_json_error('Internal Error!', status = :unprocessable_entity)
  def render_json_error(message = 'Server Error!', status = :unprocessable_entity)
    render json: {error: message}, status: status
  end

  def render_json_internal_error(message = 'Internal Server Error!')
    render_json_error(message, :internal_server_error)
  end

  def require_login
    unless current_user
      save_location
      logout
      respond_to do |format|
        format.html { redirect_to :login }
        format.json { render nothing: true, status: :unauthorized }
      end

    end

    if @user
      unless params[:token].to_s.size > 0 || @user.trade_account || self.is_a?(::ActivationController) || self.is_a?(::TradeAccountsController)
        respond_to do |format|
          format.html { redirect_to :activation }
          format.json { render nothing: true, status: :unauthorized }
        end
      end
    end
  end


  def current_user
    unless @user
      if cookies["housepad-token"].present?
        if user = HouseManagementApi::User.parse_housepad_token(cookies['housepad-token'])
          # @user = user.reload
          auth_token = user.auth_token
          @user = user.find(user.id)
          if @user.nil?
            cookies.delete "housepad-token"
            cookies.delete "housepad-ho"
            return nil
          end
          @user.auth_token = auth_token

          #  return @user
        end

      elsif params["housepad_token"]
        if user = HouseManagementApi::User.login_with_token(params['housepad_token'])
          @user = user
          cookies.permanent["housepad-token"] = @user.get_user_cookie
        end
      elsif self.is_a?(InventoryItemsController) && (params[:token] && !params[:token].empty?)
        @user = HouseManagementApi::User.new
      else
        @user = nil
      end
    end

    @user
  end


  def save_location
    return unless request.get?

    if request.path != "/" &&
      request.path != "/login" &&
      !request.xhr?

      cookies.permanent["housepad-path"] = request.fullpath
    end
  end


  def enforce_json_format
    render nothing: true, status: :not_acceptable unless params[:format] == 'json' || request.headers["Accept"] =~ /json/ || request.headers["Accept"] =~ /\*\.\*/
  end
end
