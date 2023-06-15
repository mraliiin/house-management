#require 'rest-client'

class HouseManagementApi::Inventory::Condition < ActiveResource::Base
  self.site = Rails.application.secrets.housepad_api_host + '/api/v2/inventory/'

  # Get condition by id
  def self.find_by_id(id = nil)
    Rails.cache.fetch([self, "condition_#{id}"], expires_in: 5.minutes) do
      find(id)
    end
  end

  # Get all conditions with descendants
  def self.load_all
    Rails.cache.fetch([self, 'load_all'], expires_in: 5.minutes) do
      find(:all).map { |item|
        self.load_full_hierarchy(item.id) }
    end
  end

  # Load selected conditions
  def self.load_selected_conditions(condition_id)
    selected_conditions = Array.new

    unless condition_id.blank?
      selected_condition = self.load_with_ancestors(condition_id)

      unless selected_condition["self_and_ancestors"].nil?
        current_conditions = self.load_all

        selected_condition["self_and_ancestors"].each do |ancestor|
          current_condition = nil
          current_conditions.each do |cond|
            if cond["id"].to_s.eql?(ancestor["id"].to_s)
              current_condition = cond
              break
            end
          end

          unless current_condition.nil?
            selected_conditions << current_condition
            current_conditions = current_condition["descendants"]
          end
        end
      end
    end

    selected_conditions
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
      res = RestClient.get("#{self.site}conditions/#{id}?include_deep=children")
      res.nil? ? nil : JSON.parse(res)
    end
  end

  def self.load_with_ancestors(id)
    Rails.cache.fetch([self, "load_with_ancestors#{id}"], expires_in: 5.minutes) do
      res = RestClient.get("#{self.site}conditions/#{id}?include_deep=self_and_ancestors")
      res.nil? ? nil : JSON.parse(res)
    end
  end
end