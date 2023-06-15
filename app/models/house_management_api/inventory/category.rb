#require 'rest-client'

class HouseManagementApi::Inventory::Category < ActiveResource::Base
  self.site = Rails.application.secrets.housepad_api_host + '/api/v2/inventory/'
  # self.include_root_in_json = false

  def self.find_by_id(cat_id = nil)
    Rails.cache.fetch([self, "category_#{cat_id}"], expires_in: 5.minutes) do
      find(cat_id)
    end
  end

  def self.load_full_cat(cat_id = nil)
    full_cat = self.load_cat_with_children(cat_id)

    unless full_cat.nil?
      children = Array.new
      full_cat["children"].each do |cat|
        children << self.load_full_cat(cat["id"])
      end
      full_cat["descendants"] = children
      full_cat.delete "children"
    end

    full_cat
  end

  def self.load_cat_with_children(cat_id)
    Rails.cache.fetch([self, "load_cat_with_children_#{cat_id}"], expires_in: 5.minutes) do
      res = RestClient.get("#{self.site}categories/#{cat_id}?include_deep=children")
      res.nil? ? nil : JSON.parse(res)
    end
  end


  def self.load_cat_with_ancestors(cat_id)
    Rails.cache.fetch([self, "load_cat_with_ancestors_#{cat_id}"], expires_in: 5.minutes) do
      res = RestClient.get("#{self.site}categories/#{cat_id}?include_deep=self_and_ancestors")
      res.nil? ? nil : JSON.parse(res)
    end
  end


  def self.load_all
    Rails.cache.fetch([self, 'load_all'], expires_in: 5.minutes) do
      find(:all).map { |cat| self.load_full_cat(cat.id) }
    end
  end

end