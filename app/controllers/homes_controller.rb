class HomesController < ApplicationController

  before_filter :load_house, only: [:show, :update, :rooms_index, :create_room, :reorder_rooms]

  def index
    houses = HouseManagementApi::House.load_houses @user
    #remove homes where current user is designer
    @houses = Array.new
    houses.each do |house|
      found = false

      house.user_roles.each do |user_role|
        found = true if user_role.user_id.eql?(@user.id) && user_role.role.eql?('designer')
      end
      @houses << house unless found
    end

    @trade_nav = "homes"
  end

  def show
    client = HouseManagementApi::TradeClient.find_by_id @user, params[:client_id].to_i
    @house.trade_client_id = client && client.id if @house.trade_client_id.blank?

    #Load rooms
    @house.rooms = @house.load_rooms(@user, true)

    # Load client and house data for breadcrumbs
    @clients_with_house_data = {selected_client: {}, selected_house: {}, other_clients: []}
    trade_clients = HouseManagementApi::TradeClient.find_for_user_with_house_data @user
    trade_clients.each do |c|
        if c['id'] == @house.trade_client_id
          @clients_with_house_data[:selected_client] = c
          @clients_with_house_data[:selected_house] = @house

        else
          @clients_with_house_data[:other_clients].push c
        end
    end
  end

  def update
    if @house.update_house @user, params[:home]
      head :no_content
    else
      render_json_internal_error('Failed to update home.')
    end
  end


  def destroy
    if HouseManagementApi::House.delete(@user, params[:id])
      head :no_content
    else
      render_json_internal_error('Failed to delete home.')
    end
  end


  def rooms_index
    unless @house.nil?
      @rooms = @house.load_rooms @user
    end
  end


  def create_room
    if @house.nil?
      render_json_error('Failed to create room.')
    else
      params[:room][:house_id] = @house.id
      @room = @house.create_room(@user, params[:room])
    end
  end

  def reorder_rooms
    if @house.nil?
      render_json_error('Failed to reorder rooms.')
    else
      if @house.reorder_rooms @user, params
        head :no_content
      else
        render_json_internal_error('Failed to reorder rooms.')
      end
    end
  end

  private

  def load_house
    @house = HouseManagementApi::House.find_by_id @user, params[:id].to_i
  end

end
