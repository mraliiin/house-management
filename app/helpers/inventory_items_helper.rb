module InventoryItemsHelper
  # They have both 'list' and 'add' sub-sections
  SPECIAL_SECTIONS = %w( images categories measurements conditions periods materials)
  POSITION_STEP = 100

  def self.get_item_sections (user, section_ids)
    all_available_sections = HouseManagementApi::Inventory::ItemSection::find_all(user, '')

    # Push the not required sections way to the end
    all_available_sections.each do |section|
      section['position'] = section['position'] + POSITION_STEP unless (section_ids.include?(section['id'].to_s))
    end

    item_sections = Array.new
    position = 0
    all_available_sections.sort_by { |s| s['position'] }.each do |section|
      position = position + 1
      section_model =
      {
          'position' => position,
          'name' => section['name'],
          'identifier' => section['identifier']
      }
      section_model['hasDouble'] = true if SPECIAL_SECTIONS.include?(section['identifier'].to_s.downcase)
      section_model['required'] = true if (section_ids.include?(section['id'].to_s))

      item_sections.push(section_model)
    end
    item_sections
  end

  def self.load_item_materials(item_id, material_ids)
      inventory_materials = Array.new
      material_ids.each do |id|
        material = HouseManagementApi::Inventory::Material.find_by_id(id)
        material.item_id = item_id
        inventory_materials << material
      end
      inventory_materials
  end
end