module BreadcrumbsHelper

  # Load data for all the dropdowns needed on DDR form
  def get_ddr_breadcrumbs(house_id, room_id)
    Rails.cache.fetch("ddr_#{house_id}_#{room_id}", expires_in: 5.minutes) do
      clients = HouseManagementApi::TradeClient::find_for_user(@user)

      result_data = {selected_client: nil, other_clients: []}
      clients.each do |client|
        c = JSON.parse client.attributes.to_json

        c['other_houses'] = []
        is_selected_client = false
        client.load_houses(@user).each do |h|
          # Load house rooms
          h['other_rooms'] = []
          house = HouseManagementApi::House.new(h)
          house.load_rooms(@user).each do |r|
            if (r['id'].to_s == room_id)
              h['selected_room'] = r
            else
              h['other_rooms'].push(r)
            end
          end

          # If this is the selected house
          if (h['id'].to_s == house_id)
            is_selected_client = true
            c['selected_house'] = h
          else
            c['other_houses'].push(h)
          end
        end

        if (is_selected_client)
          result_data[:selected_client] = c
        else
          result_data[:other_clients].push c
        end
      end
      result_data
    end
  end
end
