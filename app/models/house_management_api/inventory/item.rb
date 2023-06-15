#require 'rest-client'

class HouseManagementApi::Inventory::Item < ActiveResource::Base
  self.site = Rails.application.secrets.housepad_api_host + '/api/v2/inventory/'
  # self.include_root_in_json = false
  include Auth

  def self.find_by_id(item_id, user, token)
    unless token.to_s.empty?
      find(item_id, params: {token: token})
    else
      authorized_request user do
        find(item_id)
      end
    end
  end

  def self.find_items(user, params = {})
    params = params.delete_if { |key, val| val.blank? }
    authorized_request user do
      find(:all, params: params)
    end
  end

  def self.find_items_with_paging(user, params = {})
    params = params.delete_if { |key, val| val.blank? }
    res = RestClient::Request.new(
        :method => :get,
        :url => "#{self.site}/items.json?" + CGI.unescape(params.to_query),
        :headers => {
            'X-User-Email' => user.email.empty? ? user.phone : user.email,
            'X-User-Token' => user.auth_token,
            :accept => :json,
            :content_type => :json
        }
    ).execute

    pagination = JSON.parse(res.headers[:x_pagination])
    total_count = pagination.nil? ? 0 : pagination['total']
    total_pages = pagination.nil? ? 1 : pagination['total_pages']

    items = format.decode(res).map do |item|
      item[:page] = params[:page] || 1
      item[:total_count] = total_count
      item[:total_pages] = total_pages
      item
    end

    instantiate_collection( items || [] )
  end

  def save
    self.class.authorized_request self.user do
      super
    end
  end

  def update_attributes(attributes, user, token)

    if token.nil? || token.empty?
      self.class.authorized_request user do
        super(attributes)
      end
    else
      params = {inventory_item: attributes, token: token}
      RestClient.patch("#{self.class.site}items/#{self.id}", params.to_json, {:accept => :json,
                                                                              :content_type => :json})
    end

  end

  def request_info(user, params)
    res = self.class.authorized_request user do
      request_obj =
      {
          email: params[:email],
          description: params[:description],
          expiration_time: 7
      }
      request_obj['request_sections'] = params['request_sections'] unless (params['request_sections'].blank?)

      self.post "request_info", { update_request:request_obj }
    end

    res.code.eql?("200")
  end

  def load_images(user)
    self.class.authorized_request user do
      return self.get :images
    end
  end

  # ------------------------------------------------- Measurements -------------------------------------------------
  def self.load_all_measurements
    # Length, volume...
    unit_types = HouseManagementApi::Inventory::MeasurementUnitType.load_all()

    # Km, kg, inch...
    unless unit_types.nil?
      unit_types.each do |d|
        d[:dimension_types] = HouseManagementApi::Inventory::MeasurementDimensionType.find_by_unit_type(d['id'])
        d[:units] = HouseManagementApi::Inventory::MeasurementUnit.find_by_unit_type_id(d['id'].to_s)
      end
    end

    # 1/3, 1/4, 1/2
    fractions = HouseManagementApi::Inventory::MeasurementFraction.load_all()

    {
      :systems_of_measurement => ['imperial', 'metric'], # maybe pairs of id and name would be better
      :system_type => 'metric',
      :unit_types => unit_types,
      :fractions => fractions,
    }
  end

  def load_item_measurements(user, token)
    self.inventory_dimensions = HouseManagementApi::Inventory::MeasurementDimension.find_all(user, self.id, token)
  end

  # ------------------------------------------------- Conditions -------------------------------------------------
  def load_conditions
    self.inventory_conditions = Array.new
    unless (self.condition_id.nil?)
      condition = HouseManagementApi::Inventory::Condition.find_by_id(self.condition_id)
      condition.item_id = self.id
      self.inventory_conditions << condition
    end
  end

  # ------------------------------------------------- Periods -------------------------------------------------
  def load_periods
    self.inventory_periods = Array.new
    unless (self.period_id.nil?)
      period = HouseManagementApi::Inventory::Period.find_by_id(self.period_id)
      period.item_id = self.id
      self.inventory_periods << period
    end
  end

  # ------------------------------------------------- Materials -------------------------------------------------
  def add_material(params, user)
    self.class.authorized_request user do
      res = self.post "materials", nil, params.to_json
      res.code.eql?("204")
    end
  end

  def delete_material(id, user, token)
    unless token.to_s.empty?
      res = self.delete "materials/#{id}", { token: token }
    else
      self.class.authorized_request user do
        res = self.delete "materials/#{id}"
      end
    end

    res.code.eql?('204')
  end

  # ------------------------------------------------- Categories -------------------------------------------------
  def load_categories
    self.inventory_categories = Array.new
    self.inventory_category_ids.each do |cat_id|
      cat = HouseManagementApi::Inventory::Category.find_by_id(cat_id)
      cat.item_id = self.id
      self.inventory_categories << cat
    end
  end

  def add_category(params, user)
    self.class.authorized_request user do
      res = self.post "categories", nil, params.to_json
      res.code.eql?("204")
    end
  end

  def delete_category(cat_id, user, token)
    unless token.to_s.empty?
      res = self.delete "categories/#{cat_id}", {token: token}
    else
      self.class.authorized_request user do
        res = self.delete "categories/#{cat_id}"
      end
    end

     res.code.eql?('204')
  end

  def upload_item_image(filename, tempfile, user, token)
    unless token.to_s.empty?
      res = RestClient.post("#{self.class.site}items/#{self.id}/images",
                            {inventory_image: {name: filename, "image" => tempfile.open}, token: token})
    else
      res = RestClient.post("#{self.class.site}items/#{self.id}/images",
                            {inventory_image: {name: filename, "image" => tempfile.open}},
                            {"X-User-Email" => (user.email.empty? ? user.phone : user.email),
                             "X-User-Token" => user.auth_token})
    end

    res.code.to_s.eql?('201')
  rescue => e
    Rails.logger.error e.message
    Rails.logger.error e.backtrace.join("\n")
    return false
  end

  def upload_document(filename, tempfile, inventory_doc_type_id, user, token)
    # self.class.authorized_request user do
    # self.post "rooms/#{room.id}", {room: {title: room.title}, snapshots: [{image: tempfile.open}]}
    params = {inventory_document: {name: filename, "file" => tempfile.open, inventory_document_type_id: inventory_doc_type_id}}
    unless token.to_s.empty?
      res = RestClient.post("#{self.class.site}items/#{self.id}/documents", params.merge(token: token))
    else
      res = RestClient.post("#{self.class.site}items/#{self.id}/documents", params,
                                 {"X-User-Email" => (user.email.empty? ? user.phone : user.email),
                                  "X-User-Token" => user.auth_token})
    end

    res.code.to_s.eql?('201')
  rescue => e
    Rails.logger.error e.message
    Rails.logger.error e.backtrace.join("\n")
    return false
    # end
  end

  def delete_image(image_id, user, token)
    unless token.nil? || token.empty?
      res = self.delete "images/#{image_id}", {token: token}
    else
      res = self.class.authorized_request user do
        self.delete "images/#{image_id}"
      end
    end

    res.code.eql?('204')
  end

  def delete_document(doc_id, user, token)
    unless token.nil? || token.empty?
      res = self.delete "documents/#{doc_id}", {token: token}
    else
      res = self.class.authorized_request user do
        self.delete "documents/#{doc_id}"
      end
    end

    res.code.eql?('204')
  end

  def reorder_images(image_ids, user, token)
    unless token.nil? || token.empty?
      res = self.post "sort_images", {image_ids: image_ids, token: token}
    else
      res = self.class.authorized_request user do
        self.post "sort_images", {image_ids: image_ids}
      end
    end

    res.code.eql?('204')
  end

  def load_documents(user, token)
    unless token.nil? || token.empty?
      response = self.get "documents", {token: token}
    else
      response = self.class.authorized_request user do
        self.get "documents"
      end
    end

    !response.nil?
  end

  def separate_documents
    self.inventory_care_docs = Array.new
    self.inventory_warranty_docs = Array.new
    self.inventory_invoice_docs = Array.new
    self.inventory_provenance_docs = Array.new

    care_doc_type_id = HouseManagementApi::Inventory::DocumentType.find_care_doc_type_id
    warranty_doc_type_id = HouseManagementApi::Inventory::DocumentType.find_warranty_doc_type_id
    invoice_doc_type_id = HouseManagementApi::Inventory::DocumentType.find_invoice_doc_type_id
    provenance_doc_type_id = HouseManagementApi::Inventory::DocumentType.find_provenance_doc_type_id

    self.inventory_documents.each do |doc|
      case doc.inventory_document_type_id
        when care_doc_type_id
          self.inventory_care_docs << doc

        when warranty_doc_type_id
          self.inventory_warranty_docs << doc

        when invoice_doc_type_id
          self.inventory_invoice_docs << doc

        when provenance_doc_type_id
          self.inventory_provenance_docs << doc
      end
    end
  end

  # def self.authorized_request(user)
  #   unless user.new?
  #     HouseManagementApi::Inventory::Item.connection.set_header('X-User-Email', user.email.empty? ? user.phone : user.email)
  #     HouseManagementApi::Inventory::Item.connection.set_header('X-User-Token', user.auth_token)
  #   end
  #   result = yield
  # rescue => e
  #   Rails.logger.error e.message
  #   Rails.logger.error e.backtrace.join("\n")
  #   result = nil
  # ensure
  #   HouseManagementApi::Inventory::Item.connection.reset_header
  #   result
  # end
end