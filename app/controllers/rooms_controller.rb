class RoomsController < ApplicationController

  before_filter :load_room, only: [:lookbook, :inventory, :details, :update, :upload_room_image, :destroy, :reorder_images]
  before_filter :load_breadcrumbs_data, only: [:lookbook, :inventory, :details ]

  def show
    redirect_to action: "lookbook", house_id: params[:house_id], id: params[:id]
  end

  def lookbook
    notes = @house.load_room_notes @user, @room.id
    notes.each do |note|
      snapshot = @room.get_snapshot(note["snapshot_id"])
      unless snapshot.nil?
        snapshot.attributes["snapshot_notes"] ||= []
        snapshot.attributes["snapshot_notes"] << note
      end
    end

    @room_nav = "lookbook"
  end

  def inventory
    @room_nav = "inventory"
    @items = HouseManagementApi::Inventory::Item.find_items(@user, {house_id: @room.house_id, room_id: @room.id})

    @categories = HouseManagementApi::Inventory::Category.load_all

    @conditions = HouseManagementApi::Inventory::Condition.load_all

    @periods = HouseManagementApi::Inventory::Period.load_all
  end

  def details
    @room_nav = "details"
  end

  def update
    room_params = {room: Hash.new}
    _room = params[:room]
    room_params[:room][:title] = _room[:title] if _room[:title]
    room_params[:room][:description] = _room[:description] if _room[:description]

    if @house.update_room @user, @room, room_params
      head :no_content
    else
      render_json_internal_error('Failed to update room.')
    end
  end

  def destroy
    if @house.destroy_room @user, params[:id]
      head :no_content
    else
      render_json_internal_error('Failed to delete room.')
    end
  end

  def reorder_images
    if @house.reorder_images @user, params
      head :no_content
    else
      render_json_internal_error('Failed to reorder images.')
    end
  end

  def upload_room_image
    @house.upload_room_image @user, @room, params[:file].tempfile
    render nothing: true
  end

  private
  def load_breadcrumbs_data
    # Load client and house data for breadcrumbs
    @clients_with_house_data = get_inventory_breadcrumb_data
  end

  def load_room
    @house = HouseManagementApi::House.find_by_id @user, params[:house_id].to_i
    @room = @house.find_room_by_id @user, params[:id].to_i
  end

  def get_inventory_breadcrumb_data
    house = HouseManagementApi::House.find_by_id @user, @room.house_id.to_i
    house.rooms = house.load_rooms(@user)
    house.selected_room = @room

    clients_with_house_data = {selected_client: {}, selected_house: {}, other_clients: []}
    trade_clients = HouseManagementApi::TradeClient.find_for_user_with_house_data @user
    trade_clients.each do |c|
      if c['id'] == house.trade_client_id
        clients_with_house_data[:selected_client] = c
        clients_with_house_data[:selected_house] = JSON.parse house.attributes.to_json

      else
        clients_with_house_data[:other_clients].push c
      end
    end
    return clients_with_house_data
  end
end
