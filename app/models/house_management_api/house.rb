#require 'rest-client'
class HouseManagementApi::House < ActiveResource::Base
  self.site = Rails.application.secrets.housepad_api_host + '/api/v2/'
  self.include_root_in_json = true
  include Auth

  def self.load_houses(user)
    authorized_request user do
      self.all
    end
  end

  def self.delete(user, id)
    authorized_request user do
      super(id)
    end
  end

  def update_house(user, params)
    self.class.authorized_request user do
      # self.put "", {house: {name: params[:name]}}
      self.include_root_in_json = true
      self.name = params[:name] unless params.nil?
      self.trade_client_completed = params[:trade_client_completed] unless params.nil?
      self.save
    end
  end


  # def self.find_by_id(user, house_id)
  #   authorized_request user do
  #     find(house_id)
  #   end
  # end


  # get all authorized houses for user
  def self.user_houses(user)
    authorized_request user do
      find(:all)
    end
  end


  def find_room_by_id(user, id)
    self.class.authorized_request user do
      room_hash = self.get "rooms/#{id}"
      HouseManagementApi::Room.new(room_hash)
    end
  end


  def load_rooms(user, with_first_image = false)
    self.class.authorized_request user do
      rooms = self.get :rooms
      rooms.each do |room|
        room[:house_id] = self.id

        if (with_first_image && !room['snapshots'].nil?)
          first = room['snapshots'].sort_by { |r| r['position'] }[0]
          room[:first_image] = first
        end
      end
      rooms
    end
  end

  def self.load_rooms_with_first_img(user, house_id)
    Rails.cache.fetch(["house_rooms_#{house_id}"], expires_in: 5.minutes) do
      response = RestClient.get("#{self.site}houses/#{house_id}/rooms?first_image=1",
      {
          'X-User-Email' => user.email.empty? ? user.phone : user.email,
          'X-User-Token' => user.auth_token,
          :accept => :json,
          :content_type => :json
      })

      rooms = response.nil? ? [] : JSON.parse(response)
      rooms.each do |room|
        room[:house_id] = house_id
        room[:first_image] = room['first_snapshot'] unless (room['first_snapshot'].nil?)
      end
      rooms
    end
  end

  def create_room(user, params)
    self.class.authorized_request user do
      response = self.post :rooms, {room: params}
      if response.code.to_i.eql?(201)
        HouseManagementApi::Room.new JSON.parse(response.body)
      end
    end
  end


  def update_room(user, room, params)
    self.class.authorized_request user do
      response = self.put "rooms/#{room.id}", params
      response.code.to_i.eql?(200)
    end
  end

  def destroy_room(user, room_id)
    self.class.authorized_request user do
      response = self.delete "rooms/#{room_id}"
      response.code.to_i.eql?(204)
    end
  end

  def reorder_rooms(user, params)
    self.class.authorized_request user do
      response = self.post "sort_rooms", {room_ids: params[:room_ids]}
      response.code.to_i.eql?(204)
    end
  end

  def reorder_images(user, params)
    self.class.authorized_request user do
      response = self.post "rooms/#{params[:id]}/sort_images", {snapshot_ids: params[:image_ids]}
      response.code.to_i.eql?(204)
    end
  end


  def upload_room_image(user, room, tempfile)
    # self.class.authorized_request user do
    # self.post "rooms/#{room.id}", {room: {title: room.title}, snapshots: [{image: tempfile.open}]}
    RestClient.post("#{self.class.site}houses/#{room.house_id}/rooms/#{room.id}",
                    {room: {title: room.title}, "snapshots[]" => [{image: tempfile.open}]},
                    {"X-User-Email" => (user.email.empty? ? user.phone : user.email),
                     "X-User-Token" => user.auth_token})
  rescue => e
    Rails.logger.error e.message
    Rails.logger.error e.backtrace.join("\n")
  end

  def destroy_room_image(user, params)
    self.class.authorized_request user do
      self.delete "rooms/#{params[:room_id]}/delete_images", {snapshot_ids: [params[:image_id]]}
    end
  end

  def load_room_notes(user, room_id)
    self.class.authorized_request user do
      self.get "rooms/#{room_id}/snapshot_notes"
    end
  end

  def self.load_inventory_houses(user)
    self.load_houses user
    #houses = self.load_houses user
    # houses.elements.select! do |house|
    #   has_inventory_access = false
    #   for user_role in house.user_roles
    #     if user_role.user_id == user.id && user_role.inventory_access == true
    #       has_inventory_access = true
    #       break
    #     end
    #   end
    #
    #   has_inventory_access
    # end

  #  houses
  end


  # def self.authorized_request(user)
  #   HouseManagementApi::House.connection.set_header('X-User-Email', user.email.empty? ? user.phone : user.email)
  #   HouseManagementApi::House.connection.set_header('X-User-Token', user.auth_token)
  #   result = yield
  # rescue => e
  #   Rails.logger.error e.message
  #   Rails.logger.error e.backtrace.join("\n")
  #   result = nil
  # ensure
  #   HouseManagementApi::House.connection.reset_header
  #   result
  # end

end