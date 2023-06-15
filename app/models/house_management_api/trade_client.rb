class HouseManagementApi::TradeClient < ActiveResource::Base
  self.site = Rails.application.secrets.housepad_api_host + '/api/v2/'
  self.include_root_in_json = true
  include Auth

  # has_many :houses, :class_name => "HouseManagementApi::House"
  attr_accessor :houses
  attr_accessor :user



  def reload
    self.load(self.class.find(self.id).attributes, false, true)
    self
  end

  def update_attributes(attributes)
    @persisted = true

    self.class.authorized_request self.user do
      self.class.put(self.id, {trade_client: attributes})
      reload
    end
  end


  def save
    self.class.authorized_request self.user do
      # self.class.post(attributes)
      super
    end
  end


  def load_houses(user)
    self.class.authorized_request user do
      houses = self.get :houses
      houses.each do |house|
        house[:client_id] = self.id
      end
      houses
    end
  end


  def create_house(user, params)
    self.class.authorized_request user do
      response = self.post :create_house, {house: params}
      if response.code.to_i.eql?(201)
        HouseManagementApi::House.new JSON.parse(response.body)
      end
    end
  end


  def self.find_for_user(user)
    authorized_request user do
      find(:all)
    end
  end

  def self.find_for_user_with_house_data(user, trade_client_completed = nil)
    authorized_request user do
        clients = find(:all)

        clients_extra = clients.map do |client|
          c = JSON.parse client.attributes.to_json
          houses = client.load_houses user
          unless(trade_client_completed.nil?)
            houses = houses.select {|h| h["trade_client_completed"].to_s == trade_client_completed }
          end

          c[:houses] = houses
          c
        end
      clients_extra
      end
  end

  # def self.find_by_id(user, client_id)
  #   authorized_request user do
  #     find(client_id) rescue nil
  #   end
  # end

  def self.delete(user, id)
    authorized_request user do
      super(id)
    end
  end

  # def self.authorized_request(user)
  #   HouseManagementApi::TradeClient.connection.set_header('X-User-Email', user.email.empty? ? user.phone : user.email)
  #   HouseManagementApi::TradeClient.connection.set_header('X-User-Token', user.auth_token)
  #   result = yield
  # rescue => e
  #   Rails.logger.error e.message
  #   Rails.logger.error e.backtrace.join("\n")
  #   result = nil
  # ensure
  #   HouseManagementApi::TradeClient.connection.reset_header
  #   result
  # end

end