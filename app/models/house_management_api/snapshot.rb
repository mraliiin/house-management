class HouseManagementApi::Snapshot < ActiveResource::Base
  self.site = Rails.application.secrets.housepad_api_host + '/api/v2/'
  # self.include_root_in_json = true
  include Auth

  # def self.find_by_id(user, snapshot_id)
  #   authorized_request user do
  #     find(snapshot_id)
  #   end
  # end

  def load_notes(user)
    self.class.authorized_request user do
      self.get :snapshot_notes
    end
  end

  def create_note(user, params)
    self.class.authorized_request user do
      response = self.post :snapshot_notes, {snapshot_note: params}
      if response.code.to_i.eql?(201)
        JSON.parse(response.body)
      end
    end
  end

  def update_note(user, params)
    self.class.authorized_request user do
      response = self.put "snapshot_notes/#{params[:note_id]}", {snapshot_note: params}
      if response.code.to_i.eql?(201)
        JSON.parse(response.body)
      end
    end
  end

  def destroy_note(user, params)
    self.class.authorized_request user do
      self.delete "snapshot_notes/#{params[:note_id]}"
    end
  end


  def reorder_notes(user, params)
    self.class.authorized_request user do
      response = self.post "sort_snapshot_notes", {snapshot_note_ids: params[:note_ids]}
      response.code.to_i.eql?(204)
    end
  end

  #
  # def self.authorized_request(user)
  #   HouseManagementApi::Snapshot.connection.set_header('X-User-Email', user.email.empty? ? user.phone : user.email)
  #   HouseManagementApi::Snapshot.connection.set_header('X-User-Token', user.auth_token)
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