class HouseManagementApi::Room <  ActiveResource::Base
  self.site = Rails.application.secrets.housepad_api_host + '/api/v2/'
  self.include_root_in_json = true
  include Auth

  # def self.find_by_id(user, room_id)
  #   authorized_request user do
  #     find(room_id)
  #   end
  # end

  def get_snapshot(snapshot_id)
    self.snapshots.select{|snap| snap.id.to_s == snapshot_id.to_s}.first
  end

  # def self.authorized_request(user)
  #   HouseManagementApi::House.connection.set_header('X-User-Email', user.email.empty? ? user.phone : user.email)
  #   HouseManagementApi::House.connection.set_header('X-User-Token', user.auth_token)
  #   result = yield
  # rescue => e
  #   Rails.logger.error e.message
  #   Rails.logger.error e.backtrace.join("\n")
  #   result = nil
  # ensure
  #   HouseManagementApi::House.connection.reset_header
  #   result
  # end

end