#require 'rest-client'

# 1/3, 1/4, 1/2
class HouseManagementApi::Inventory::MeasurementFraction < ActiveResource::Base
  self.site = Rails.application.secrets.housepad_api_host + '/api/v2/inventory/fractions/'

  def self.load_all
      response = RestClient.get("#{self.site}")
      response.nil? ? nil : JSON.parse(response)
  end
end
