class RoomImagesController < ApplicationController

  before_filter :load_snapshot, only: [:create_note, :update_note, :show, :destroy_note, :destroy, :reorder_notes]


  def snapshots
    house = HouseManagementApi::House.find_by_id @user, params[:project].to_i
    room = house.find_room_by_id @user, params[:id].to_i
    @snapshots = room.attributes["snapshots"]
  end


  def show
    @notes = @snapshot.load_notes @user
  end

  def destroy
    house = HouseManagementApi::House.find_by_id @user, @snapshot.house_id
    house.destroy_room_image @user, {room_id: @snapshot.target_id, image_id: @snapshot.id}
    head :no_content
  end

  def create_note
    # snapshot = HouseManagementApi::Snapshot.new
    # snapshot.id = params[:room_image_id]
    @snapshot.create_note @user, params.except(:room_image_id, :room_image)
  end


  def update_note
    @snapshot.update_note @user, params.except(:room_image_id, :room_image)
    head :no_content
  end

  def destroy_note
    @snapshot.destroy_note @user, params.except(:room_image_id, :room_image)
    head :no_content
  end


  def reorder_notes
    if @snapshot.nil?
      render_json_error('Failed to reorder notes.')
    else
      if @snapshot.reorder_notes @user, params
        head :no_content
      else
        render_json_internal_error('Failed to reorder notes.')
      end
    end
  end


  private

  def load_snapshot
    @snapshot = HouseManagementApi::Snapshot.find_by_id @user, params[:id].to_i
  end

end
