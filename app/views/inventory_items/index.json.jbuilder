
json.array! @items do |item|
  json.id item.id
  json.title item.title
  json.total_count item.total_count
  json.total_pages item.total_pages
  json.page item.page
  json.inventory_images item.inventory_images
  json.inventory_documents item.inventory_documents
  json.provenance_description item.provenance_description
end
