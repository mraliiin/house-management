#require 'rest-client'

class HouseManagementApi::Inventory::MeasurementDimension < ActiveResource::Base
  self.site = Rails.application.secrets.housepad_api_host + '/api/v2/inventory/'

  def self.find_all (user, item_id, token)

    unless token.to_s.empty?
      response = RestClient.get("#{self.site}items/#{item_id}/dimensions?token=#{token}")
    else
      response = RestClient.get("#{self.site}items/#{item_id}/dimensions",
          {
              'X-User-Email' => user.email.empty? ? user.phone : user.email,
              'X-User-Token' => user.auth_token,
              :accept => :json,
              :content_type => :json
          }
      )
    end

    response.nil? ? nil : JSON.parse(response)
  end


  def self.find_by_id (user, item_id, dimension_id)
    response = RestClient.get(
        :method => :get,
        :url => "#{self.site}/#{item_id}/dimensions/#{dimension_id}",
        :headers => {
            'X-User-Email' => user.email.empty? ? user.phone : user.email,
            'X-User-Token' => user.auth_token,
            :accept => :json,
            :content_type => :json
        }
    )

    response.nil? ? nil : JSON.parse(response)
  end
end


