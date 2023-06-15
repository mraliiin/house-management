#require 'rest-client'

# Km, kg, inch...
class HouseManagementApi::Inventory::MeasurementUnit < ActiveResource::Base
  self.site = Rails.application.secrets.housepad_api_host + '/api/v2/inventory/dimension_units'

  def self.find_by_unit_type_id (id)
      response = RestClient.get("#{self.site}/?unit_type_id=" + id)
      response.nil? ? nil : JSON.parse(response)
  end
end
