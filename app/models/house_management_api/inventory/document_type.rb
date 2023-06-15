class HouseManagementApi::Inventory::DocumentType < ActiveResource::Base
  self.site = Rails.application.secrets.housepad_api_host + '/api/v2/inventory/'
  # self.include_root_in_json = false

  def self.find_all
    Rails.cache.fetch([self, 'find_all'], expires_in: 5.minutes) do
      find(:all)
    end
  end

  def self.find_by_type(type = '')
    Rails.cache.fetch([self, type], expires_in: 5.minutes) do
      self.find_all.select { |record| record.name.match(/#{type}/i) }.first.try(:id)
    end
  end

  def self.find_provenance_doc_type_id
    find_by_type('provenance')
  end


  def self.find_care_doc_type_id
    find_by_type('care')
  end

  def self.find_warranty_doc_type_id
    find_by_type('warranty')
  end


  def self.find_invoice_doc_type_id
    find_by_type('invoice')
  end


  # def self.authorized_request(user)
  #   HouseManagementApi::Inventory::DocumentType.connection.set_header('X-User-Email', user.email.empty? ? user.phone : user.email)
  #   HouseManagementApi::Inventory::DocumentType.connection.set_header('X-User-Token', user.auth_token)
  #   result = yield
  # rescue => e
  #   Rails.logger.error e.message
  #   Rails.logger.error e.backtrace.join("\n")
  #   result = nil
  # ensure
  #   HouseManagementApi::Inventory::DocumentType.connection.reset_header
  #   result
  # end

end