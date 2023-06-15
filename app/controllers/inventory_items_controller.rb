class InventoryItemsController < ApplicationController
  include BreadcrumbsHelper

  before_filter :load_item, only:
  [
    :upload_item_image, :show, :edit, :update, :images, :delete_image, :reorder_images,
    :upload_provenance_document, :upload_care_document, :upload_invoice_document, :upload_warranty_document,
    :provenance_documents, :care_documents, :invoice_documents, :warranty_documents, :delete_document,
    :add_category, :delete_category, :categories,
    :add_material, :delete_material, :materials,
    :conditions, :periods
  ]

  before_filter :load_all_measurements, only: [:index, :new]
  before_filter :load_measurements_by_category, only: [:edit, :show]
  before_filter :category_load_all, only: [:index, :edit, :new, :show]
  before_filter :load_categories, only: [:edit, :show, :categories]
  before_filter :conditions_load_all, only: [:index, :edit, :new, :show]
  before_filter :periods_load_all, only: [:index, :edit, :new, :show]
  before_filter :material_load_all, only: [:index, :edit, :new, :show]
  before_filter :prepare_documents, only: [:care_documents, :invoice_documents, :warranty_documents]
  before_filter :separate_documents, only: [:edit, :show]

  def index
    filters = {};
    filters[:house_id] = params[:project] unless (params[:project].nil?)
    filters[:room_id] = params[:room] unless (params[:room].nil?)
    filters[:page] = params[:page] || 1
    filters[:state] = params[:state] unless (params[:state].nil?)
    filters[:inventory_document_type_id] = params[:doc_type].to_s unless (params[:doc_type].nil?)
    filters[:user_id] = @user.id

    # Get inventory items
    @items = HouseManagementApi::Inventory::Item.find_items_with_paging(@user, filters)

    # Load house data for breadcrumbs
    @inventory_breadcrumb_data = get_inventory_breadcrumb_data(params[:project], params[:room])

    # Selected categories
    @selected_categories = get_selected_categories(@categories, params[:cat_id])

    # Selected conditions
    @selected_conditions = HouseManagementApi::Inventory::Condition.load_selected_conditions(params[:cond_id])

    # Selected periods
    @selected_periods = HouseManagementApi::Inventory::Period.load_selected_periods(params[:per_id])

    respond_to do |format|
      format.json
      format.html
    end
  end

  def new
    # Load all sections and mark item sections as required
    @all_available_sections = InventoryItemsHelper.get_item_sections(@user, [])
    render :edit
  end

  def new_request_info
    @ddr_breadcrumb_data = get_ddr_breadcrumbs(params[:project], params[:room])
    # Get all available sections
    @all_item_sections = HouseManagementApi::Inventory::ItemSection::find_all(@user, params[:token])
  end

  def request_info
    filters =  {
        title: params[:title],
    }

    filters[:house_id] = params[:house_id].to_i unless(params[:house_id].nil? || params[:house_id].blank?)
    filters[:room_id] = params[:room_id].to_i unless(params[:room_id].nil? || params[:room_id].blank?)

    @item = HouseManagementApi::Inventory::Item.new({ inventory_item: filters })
    @item.user = @user

    if @item.save && @item.request_info(@user, params)
      head :no_content
    else
      render_json_internal_error('Failed to request item info.')
    end
  end

  def edit
  # For vendors we need to display the person who requested the DRR
  if (params[:token])
      @item.is_vendor = true
      if(@item.user_id)
        designer = HouseManagementApi::User.find(@item.user_id)
        @item.request_owner = designer.full_name_with_salutation unless designer.nil?
      end
      else
        @item.is_vendor = false
    end
  end

  def show
  end

  def create
    @item = HouseManagementApi::Inventory::Item.new(params)
    @item.user = @user

    if @item.save
      render :create
    else
      render_json_internal_error('Failed to save inventory item.')
    end
  end

  def update
    @item.user = @user

    params[:tmp] = params[:tmp].eql?"true" ? true : false
    @item.update_attributes(params.except(
          #:inventory_item, without this the save won't work
          :inventory_documents,
          :inventory_images,
          :inventory_care_docs,
          :inventory_provenance_docs,
          :inventory_categories,
          :inventory_warranty_docs,
          :inventory_invoice_docs,
          :inventory_conditions,
          :inventory_periods,
          :inventory_dimensions,
          :inventory_dimension_ids,
          :inventory_dimensions_attributes,
      ), @user, params[:token]);

  render :update

  rescue Exception => e
    render_json_internal_error "Failed to update home. #{e.message}"
  end

  # ------------------------------------------------- Docs & Images -----------------------------------------------
  def upload_item_image
    if @item.upload_item_image params[:file].original_filename, params[:file].tempfile, @user, params[:token]
      head :no_content
    else
      render_json_internal_error('Failed to upload image.')
    end
  end

  def provenance_documents
  end

  def care_documents
  end

  def invoice_documents
  end

  def warranty_documents
  end

  def upload_provenance_document
    if @item.upload_document(
        params[:file].original_filename,
        params[:file].tempfile,
        HouseManagementApi::Inventory::DocumentType.find_provenance_doc_type_id,
        @user,
        params[:token]
    )

      head :no_content
    else
      render_json_internal_error('Failed to upload document.')
    end
  end

  def upload_care_document
    if @item.upload_document(params[:file].original_filename, params[:file].tempfile,
                             HouseManagementApi::Inventory::DocumentType.find_care_doc_type_id, @user, params[:token])
      head :no_content
    else
      render_json_internal_error('Failed to upload document.')
    end
  end

  def upload_invoice_document
    if @item.upload_document(params[:file].original_filename, params[:file].tempfile,
                             HouseManagementApi::Inventory::DocumentType.find_invoice_doc_type_id, @user, params[:token])
      head :no_content
    else
      render_json_internal_error('Failed to upload document.')
    end
  end

  def upload_warranty_document
    if @item.upload_document(params[:file].original_filename, params[:file].tempfile,
                             HouseManagementApi::Inventory::DocumentType.find_warranty_doc_type_id, @user, params[:token])
      head :no_content
    else
      render_json_internal_error('Failed to upload document.')
    end
  end

  def images
  end

  def reorder_images
    if @item.nil?
      render_json_error('Failed to reorder images.')
    else
      if @item.reorder_images params[:image_ids], @user, params[:token]
        head :no_content
      else
        render_json_internal_error('Failed to reorder images.')
      end
    end
  end

  def delete_image
    if @item.delete_image(params[:image_id], @user, params[:token])
      head :no_content
    else
      render_json_internal_error('Failed to delete image.')
    end
  end

  def delete_document
    if @item.delete_document(params[:doc_id], @user, params[:token])
      head :no_content
    else
      render_json_internal_error('Failed to delete document.')
    end
  end

  # ------------------------------------------------- Categories -------------------------------------------------
  def load_categories
    @item.load_categories
  end

  def categories
  end

  def add_category
    if @item.add_category params.slice(:category, :token), @user
      head :no_content
    else
      render_json_internal_error('Failed to add category.')
    end
  end

  def delete_category
    if @item.delete_category params[:cat_id], @user, params[:token]
      head :no_content
    else
      render_json_internal_error('Failed to delete category.')
    end
  end

  # ------------------------------------------------- Materials -------------------------------------------------
  def material_load_all
    @materials = HouseManagementApi::Inventory::Material.load_all
  end

  def materials
  end

  def add_material
    if @item.add_material params.slice(:material, :token), @user
      head :no_content
    else
      render_json_internal_error('Failed to add material.')
    end
  end

  def delete_material
    if @item.delete_material params[:material_id], @user, params[:token]
      head :no_content
    else
      render_json_internal_error('Failed to delete material.')
    end
  end

  # ------------------------------------------------- Conditions -------------------------------------------------
  def conditions
    @item.load_conditions
  end

  # ------------------------------------------------- Periods -------------------------------------------------
  def periods
    @item.load_periods
  end

  # ------------------------------------------------- Private region ---------------------------------------------
  private
  def get_selected_categories(categories, cat_id)
    selected_categories = Array.new

    unless cat_id.blank?
      selected_cat = HouseManagementApi::Inventory::Category.load_cat_with_ancestors(cat_id)

      unless selected_cat["self_and_ancestors"].nil?
        current_categories = categories
        selected_cat["self_and_ancestors"].each do |ancestor|
          current_cat = nil
          current_categories.each do |cat|
            if cat["id"].to_s.eql?(ancestor["id"].to_s)
              current_cat = cat
              break
            end
          end

          unless current_cat.nil?
            selected_categories << current_cat
            current_categories = current_cat["descendants"]
          end
        end
      end
    end

    selected_categories
  end

  def load_item
    @item = HouseManagementApi::Inventory::Item.find_by_id params[:id].to_i, @user, params[:token]

    unless (@item.nil?)
      @item.separate_documents
      @item.requested_item_sections = InventoryItemsHelper.get_item_sections(@user, @item.request_sections)
      @item.inventory_materials = InventoryItemsHelper.load_item_materials(@item.id, @item.inventory_material_ids)
      @item.load_conditions
      @item.load_periods
    end
  end

  def prepare_documents
    @item.load_documents(@user, params[:token])
  end

  def separate_documents
    @item.separate_documents
  end

  def category_load_all
    @categories = HouseManagementApi::Inventory::Category.load_all
  end

  def conditions_load_all
    @conditions = HouseManagementApi::Inventory::Condition.load_all
  end

  def periods_load_all
    @periods = HouseManagementApi::Inventory::Period.load_all
  end

  # ------------------------------------------------------ Inventory dimensions -------------------------------------------------
  # Get a hash of unit_types containing dimension_types per unit_type, units per unit_type,
  # fractions and measurements systems (for extra dimensions)
  def load_all_measurements
    @measurements = HouseManagementApi::Inventory::Item.load_all_measurements
  end

  # From the general measurements (unit_types above) keep only the ones that
  # have dimension_types corresponding to item categories (for default dimensions)
  def load_measurements_by_category
    @measurements = load_all_measurements

    unless (@item.nil?)
      @item.inventory_dimensions = load_dimensions_pretty_names(@measurements, params[:token])
    end

    # Filter by category ids
    general_unit_types = []
    @measurements[:unit_types_by_category] = []
    @measurements[:unit_types].each do |unit_type|
      unit_type[:dimension_types].each do |dimension_type|
        if (@item.inventory_category_ids & dimension_type['inventory_category_ids']) # if item category is the same with dimension category
          if (!@measurements[:unit_types_by_category].any? {|u| u['id'] == unit_type['id']}) # get unique elements
            @measurements[:unit_types_by_category] << unit_type
          end
        else
          general_unit_types << unit_type
        end
      end
    end
    # Extra dimension types excluding the categories-associated ones
    @measurements[:unit_types] = general_unit_types
  end

  # Find dimension_type/unit/fraction label to display to the user
  def load_dimensions_pretty_names (all_measurements, token)
    inventory_dimensions = HouseManagementApi::Inventory::MeasurementDimension.find_all(@user, @item.id, token)
    return [] unless inventory_dimensions

    pretty_dimensions = inventory_dimensions.map do |d|
      # A little mapping to the view model
      model = {
          'id' => d['id'],
          'unit_id' => d['inventory_dimension_unit_id'],
          'fraction_id' => d['inventory_fraction_id'],
          'dimension_type_id' => d['inventory_dimension_type_id'],
          'dimension_value' => d['value']
      }

      fraction = all_measurements[:fractions].find{ |f| f['id'] == d['inventory_fraction_id'] }
      model['fraction_name'] = fraction['name'] unless fraction.nil?

      all_measurements[:unit_types].each do |t|
        if model['unit_name'].nil?
          unit = t[:units].find{ |u| u['id'] == d['inventory_dimension_unit_id'] }
          model['unit_name'] = unit['name'] unless unit.nil?
        end

        if model['dimension_type_name'].nil?
          dimension_type = t[:dimension_types].find{ |u| u['id'] == d['inventory_dimension_type_id'] }
          model['dimension_type_name'] = dimension_type['name'] unless dimension_type.nil?
        end
      end

      model
    end
    pretty_dimensions
  end

  # --------------------------------------------------- Breadcrumbs -------------------------------------------------------------
  def get_inventory_breadcrumb_data(house_id, room_id)
    selected_house = HouseManagementApi::House.find_by_id @user, house_id.to_i

    unless(selected_house.nil?)
      # Get the room
      room = selected_house.find_room_by_id @user, room_id.to_i
      # Make the connections
      selected_house.selected_room = JSON.parse room.attributes.to_json unless room.nil?
    end

    breadcrumbs_data = {selected_house: {}, other_houses: []}
    houses = HouseManagementApi::House.load_houses @user
    houses.sort_by { |hh| hh.name }.each do |h|
      if (!selected_house.nil? && h.id == selected_house.id)
        selected_house.rooms = selected_house.load_rooms(@user)
        breadcrumbs_data[:selected_house] = JSON.parse selected_house.attributes.to_json
      else
        h.rooms = h.load_rooms(@user)
        breadcrumbs_data[:other_houses].push JSON.parse h.attributes.to_json
      end
    end
    return breadcrumbs_data
  end
end