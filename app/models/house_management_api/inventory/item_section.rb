#require 'rest-client'

class HouseManagementApi::Inventory::ItemSection < ActiveResource::Base
  self.site = Rails.application.secrets.housepad_api_host + '/api/v2/inventory/item_sections'

  def self.find_all (user, token)
    Rails.cache.fetch([self, 'find_all'], expires_in: 5.minutes) do
      unless token.to_s.empty?
        response = RestClient.get("#{self.site}?token=#{token}")
      else
        response = RestClient.get("#{self.site}",
        {
            'X-User-Email' => user.email.empty? ? user.phone : user.email,
            'X-User-Token' => user.auth_token,
            :accept => :json,
            :content_type => :json
        })
      end

      response.nil? ? nil : JSON.parse(response)
    end
  end
end


