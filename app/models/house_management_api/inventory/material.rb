#require 'rest-client'

class HouseManagementApi::Inventory::Material < ActiveResource::Base
  self.site = Rails.application.secrets.housepad_api_host + '/api/v2/inventory/'

  def self.load_all
    Rails.cache.fetch([self, 'load_all'], expires_in: 5.minutes) do
      find(:all).map { |m| self._load_full_material(m.id) }
    end
  end

  def self.find_by_id(id = nil)
    Rails.cache.fetch([self, "material_#{id}"], expires_in: 5.minutes) do
      find(id)
    end
  end

  def self._load_full_material(material_id = nil)
    full_material = self._load_material_with_children(material_id)

    unless full_material.nil?
      children = Array.new
      full_material["children"].each do |m|
        children << self._load_full_material(m["id"])
      end
      full_material["descendants"] = children
      full_material.delete "children"
    end

    full_material
  end

  def self._load_material_with_children(material_id)
    Rails.cache.fetch([self, "load_material_with_children_#{material_id}"], expires_in: 5.minutes) do
      res = RestClient.get("#{self.site}materials/#{material_id}?include_deep=children")
      res.nil? ? nil : JSON.parse(res)
    end
  end

  def self.load_material_with_ancestors(material_id)
    Rails.cache.fetch([self, "load_material_with_ancestors_#{material_id}"], expires_in: 5.minutes) do
      res = RestClient.get("#{self.site}materials/#{material_id}?include_deep=self_and_ancestors")
      res.nil? ? nil : JSON.parse(res)
    end
  end
end