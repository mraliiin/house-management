#require 'rest-client'

# Length, Volume ...
class HouseManagementApi::Inventory::MeasurementUnitType < ActiveResource::Base
  self.site = Rails.application.secrets.housepad_api_host + '/api/v2/inventory/unit_types/'

  def self.load_all
      response = RestClient.get("#{self.site}")
      response.nil? ? nil : JSON.parse(response)
  end
end
