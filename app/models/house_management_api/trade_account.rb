class HouseManagementApi::TradeAccount < ActiveResource::Base
  self.site = Rails.application.secrets.housepad_api_host + '/api/v2/'
  self.include_root_in_json = true

  attr_accessor :user

  def reload
    self.load(find(self.id).attributes, false, true)
    self
  end

  def update_attributes(attributes)
    @persisted = true

    authorized_request attributes[:user] do
      self.class.put(self.id, {trade_account: attributes})
      reload
    end
  end

  def save
    authorized_request self.user do
      # self.class.post(attributes)
      super
    end
  end


  def find(trade_account_id = nil)
    authorized_request self.user do
      self.class.find(trade_account_id)
    end
  end


  def authorized_request(user)
    HouseManagementApi::TradeClient.connection.set_header('X-User-Email', user.email.empty? ? user.phone : user.email)
    HouseManagementApi::TradeClient.connection.set_header('X-User-Token', user.auth_token)
    result = yield
  rescue => e
    Rails.logger.error e.message
    Rails.logger.error e.backtrace.join("\n")
    result = nil
  ensure
    HouseManagementApi::TradeClient.connection.reset_header
    result
  end

end