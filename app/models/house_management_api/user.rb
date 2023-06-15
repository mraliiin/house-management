class HouseManagementApi::User < ActiveResource::Base
  self.site = Rails.application.secrets.housepad_api_host + '/api/v2/'
  self.include_root_in_json = true
  include Auth

  def create
    self.include_root_in_json = false
    result = RestClient.post("#{self.class.site}users",
                    {token: "Love Going Home", user: self.attributes.merge!({enable_trade_account: true})})

    self.include_root_in_json = true
    json_result = JSON.parse(result)
    self.id = json_result["id"]
    self.auth_token = json_result["authentication_token"]
    return true
  rescue Exception => e
    response = JSON.parse e.response
    if response["status"] == 422
      if response["error"].eql?"Please enter a different phone number"
        return {phone: response["error"]}
      elsif response["error"].eql?"Please enter a different email address"
        return {email: response["error"]}
      elsif response["error"] =~ /^Password is too short/i
        return {password: response["error"]}
      elsif response["error"] =~ /^Please enter a different phone number and email address$/
        return {email: "Please enter a different email address.", phone: "Please enter a different phone number"}
      else
        return {message: response["error"]}
      end
    end
  end


  def user
    self
  end

  def full_name
    [self.first_name, self.last_name].join(' ')
  end

  def full_name_with_salutation
    [self.salutation, self.first_name, self.last_name].join(' ')
  end

  def get_user_cookie
    cookie_str = [self.id, self.auth_token, self.email, self.phone].join("#")
    HouseManagementApi::CryptUtil::encrypt(cookie_str)
  end

# Get user from short term token
  def self.login_with_token(token)
    user = get(:get_long_token, {short_token: token})
    user_attributes = user['user'].merge(auth_token: user['token'])
    new(user_attributes)
  rescue => e
    Rails.logger.error e.message
    nil
  end

# get user from session pased cookies
  def self.parse_housepad_token(token = '')
    token_arr = HouseManagementApi::CryptUtil::decrypt(token).split('#')
    token_arr.size.eql?(4) ?
      HouseManagementApi::User.new(
        id: token_arr[0],
        auth_token: token_arr[1],
        email: token_arr[2],
        phone: token_arr[3],
        loaded_users: Hash.new
      ) : nil
  end

# #returned loaded user
  def reload
    _auth_token = self.auth_token
    Rails.cache.delete([self, "user_id[#{self.id}]/#{auth_token}"])
    self.load(find(self.id).attributes, false, true)
    self.auth_token = _auth_token
    self
  end

  def update_attributes(attributes)
    @persisted = true
    self.class.authorized_request(user) do
      self.class.put(self.id, {user: attributes})
      reload
    end
  end

  def find(user_id = nil)
    self.class.authorized_request(user) do
      Rails.cache.fetch([self, "user_id[#{user_id}]/#{auth_token}"], expires_in: 5.minutes) do
        self.class.find(user_id)
      end
    end
  end

  def load_billing_info
    begin
      Rails.cache.fetch("user_billing_info[#{self.id}]/#{self.auth_token}", expires_in: 5.minutes) do
        self.class.authorized_request(user) do
          self.get "billing_info"
        end
      end
    rescue
      return nil
    end
  end

  def update_billing_info(billing_info)
    self.class.authorized_request(user) do
      response = self.put "billing_info", billing_info
      response.code.to_i.eql?(200)
    end
  end

  # def authorized_request(&block)
  #   HouseManagementApi::User.connection.set_header('X-User-Email', self.email.empty? ? self.phone : self.email)
  #   HouseManagementApi::User.connection.set_header('X-User-Token', self.auth_token)
  #   #Rails.logger.info("CALLER -> " + caller[0][/`.*'/][1..-2])
  #   result = block.call
  # rescue => e
  #   Rails.logger.error e.message
  #   Rails.logger.error e.backtrace.join("\n")
  #   result = nil
  # ensure
  #   HouseManagementApi::User.connection.reset_header
  #   result
  # end

end