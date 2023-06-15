module LoginHelper

  def login
    user_gigi = build(:user_gigi)
    housePadApp = HouseManagementApi::HousePadApp.new
    @user = HouseManagementApi::Session.login(user_gigi.email, user_gigi.password)
    housepad_token = @user.get_user_cookie
    request.headers["Cookie"] = "housepad-token=#{housepad_token};"
  end

end
