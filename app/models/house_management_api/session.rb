class HouseManagementApi::Session < ActiveResource::Base
  self.site = Rails.application.secrets.housepad_api_host + '/api/v2/'
  self.headers['User-Agent'] = 'DesignCarta web/client'

  def self.devise
    {device: {udid: "-", platform: "web", client_identifier: "house-management"}}
  end

  def self.login(email = '', password = '')
    session = create(devise.merge({user_session: {email: email, password: password}}))
    HouseManagementApi::User.new({
                            id: session.user_id,
                            phone: session.phone,
                            email: session.email,
                            auth_token: session.auth_token
                          })
  rescue => e
    Rails.logger.error e.message
    nil
  end

end