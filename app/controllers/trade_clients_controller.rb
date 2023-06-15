class TradeClientsController < ApplicationController
  include BreadcrumbsHelper

  before_filter :load_trade_client, only: [:show, :update, :houses_index, :create_house]

  def index
    @json_clients = HouseManagementApi::TradeClient.find_for_user_with_house_data(@user, params[:trade_client_completed])

    @ddr_breadcrumb_data = get_ddr_breadcrumbs(params[:project], params[:room])
    @all_item_sections = HouseManagementApi::Inventory::ItemSection::find_all(@user, params[:token])
    
    @trade_nav = "clients"
  end

  def show
    unless @client.nil?
      @client.houses = @client.load_houses @user

      # Load all clients and mark the current (used for new project popup)
      @clients = HouseManagementApi::TradeClient.find_for_user @user
      @json_clients = @clients.map do |client|
        c = JSON.parse client.attributes.to_json
        c[:is_current] = true if client.id == @client.id
        c
      end
    else
      redirect_to trade_clients_url
    end
  end

  def create
    @client = HouseManagementApi::TradeClient.new(params)
    @client.user = @user
    @client.user_id = @user.id

    if @client.save
      head :no_content
    else
      render_json_internal_error('Failed to save client.')
    end
  end

  def update
    @client.user = @user
    if @client.update_attributes(params.slice("first_name", "last_name", "email", "phone"))
      head :no_content
    else
      render_json_internal_error('Failed to update client.')
    end
  end

  def destroy
    if HouseManagementApi::TradeClient.delete(@user, params[:id])
      head :no_content
    else
      render_json_internal_error('Failed to delete client.')
    end
  end

  def houses_index
    unless @client.nil?
      @houses = @client.load_houses @user
    end
  end

  def create_house
    if @client.nil?
      render_json_error('Failed to create house.')
    else
      @house = @client.create_house(@user, params[:house])
    end
  end

  private

  def load_trade_client
    @client = HouseManagementApi::TradeClient.find_by_id @user, params[:id].to_i
  end

end
