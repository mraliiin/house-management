#require 'rest-client'

class HouseManagementApi::Inventory::Period < ActiveResource::Base
  self.site = Rails.application.secrets.housepad_api_host + '/api/v2/inventory/'

  # Get period by id
  def self.find_by_id(id = nil)
    Rails.cache.fetch([self, "period_#{id}"], expires_in: 5.minutes) do
      find(id)
    end
  end

  # Get all periods with descendants
  def self.load_all
    Rails.cache.fetch([self, 'load_all'], expires_in: 5.minutes) do
      find(:all).map { |item|
        self.load_full_hierarchy(item.id) }
    end
  end

  # Load selected periods
  def self.load_selected_periods(period_id)
    selected_periods = Array.new

    unless period_id.blank?
      selected_period = self.load_with_ancestors(period_id)

      unless selected_period["self_and_ancestors"].nil?
        current_periods = self.load_all

        selected_period["self_and_ancestors"].each do |ancestor|
          current_period = nil
          current_periods.each do |p|
            if p["id"].to_s.eql?(ancestor["id"].to_s)
              current_period = p
              break
            end
          end

          unless current_period.nil?
            selected_periods << current_period
            current_periods = current_period["descendants"]
          end
        end
      end
    end

    selected_periods
  end

  private
  def self.load_full_hierarchy(id = nil)
    result = self.load_with_children(id)

    unless result.nil?
      children = Array.new
      result["children"].each do |child|
        children << self.load_full_hierarchy(child["id"])
      end
      result["descendants"] = children
      result.delete "children"
    end

    result
  end

  def self.load_with_children(id)
    Rails.cache.fetch([self, "load_with_children#{id}"], expires_in: 5.minutes) do
      res = RestClient.get("#{self.site}periods/#{id}?include_deep=children")
      res.nil? ? nil : JSON.parse(res)
    end
  end

  def self.load_with_ancestors(id)
    Rails.cache.fetch([self, "load_with_ancestors#{id}"], expires_in: 5.minutes) do
      res = RestClient.get("#{self.site}periods/#{id}?include_deep=self_and_ancestors")
      res.nil? ? nil : JSON.parse(res)
    end
  end
end