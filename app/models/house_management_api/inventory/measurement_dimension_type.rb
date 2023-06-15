#require 'rest-client'

# InnerVolume, OuterVolume ...
class HouseManagementApi::Inventory::MeasurementDimensionType < ActiveResource::Base
  self.site = Rails.application.secrets.housepad_api_host + '/api/v2/inventory/dimension_types'

  def self.find_by_unit_type(id)
      response = RestClient.get("#{self.site}?unit_type_id=#{id}")
      response.nil? ? nil : JSON.parse(response)
  end
end
