Rails.application.routes.draw do

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  scope "/trade" do
    # You can have the root of your site routed with "root"
    root 'home#index'

    get '/login' => 'sessions#new', as: :login
    post "/sessions" => "sessions#create"
    delete '/logout' => 'sessions#destroy', as: :logout
    get '/logout' => 'sessions#destroy', as: :get_logout
    get '/register' => 'sessions#register', as: :registration

    get '/activation' => 'activation#index', as: :activation


    get '/settings/account-details' => 'settings#account_details'
    get '/settings/billing' => 'settings#billing'
    get '/settings' => 'settings#index', as: :settings

    post '/users(.:format)' => 'users#create'
    put '/users/:id(.:format)' => 'users#update'
    patch '/users/:id(.:format)' => 'users#update'
    post '/users/upload_avatar' => 'users#upload_avatar'
    post '/users/update-subscription(.:format)' => 'users#update_subscription'

    get '/clients' => 'trade_clients#index', as: :trade_clients
    get '/clients/new' => 'trade_clients#index'
    get '/clients/:id' => 'trade_clients#show'
    post '/clients' => 'trade_clients#create'
    put '/clients/:id(.:format)' => 'trade_clients#update'
    get '/clients/:id/houses' => 'trade_clients#houses_index'
    post '/clients/:id/create_house(.:format)' => 'trade_clients#create_house'
    delete '/clients/:id(.:format)' => 'trade_clients#destroy'

    get '/clients/:client_id/projects/:id(.:format)' => 'homes#show'
    get '/homes' => 'homes#index'
    get '/homes/:id(.:format)' => 'homes#show'
    get '/projects/:id(.:format)' => 'homes#show'
    put '/homes/:id(.:format)' => 'homes#update'
    post '/homes/:id(.:format)' => 'homes#update'
    delete '/homes/:id(.:format)' => 'homes#destroy'
    get '/homes/:id/rooms(.:format)' => 'homes#rooms_index'
    post '/homes/:id/create_room(.:format)' => 'homes#create_room'
    post '/homes/:id/reorder_rooms(.:format)' => 'homes#reorder_rooms'

    get '/homes/:house_id/rooms/:id(.:format)' => 'rooms#show'
    get '/projects/:house_id/rooms/:id(.:format)' => 'rooms#show'
    get '/projects/:house_id/rooms/:id/lookbook' => 'rooms#lookbook', as: :room_lookbook
    get '/projects/:house_id/rooms/:id/inventory' => 'rooms#inventory', as: :room_inventory
    get '/projects/:house_id/rooms/:id/details' => 'rooms#details', as: :room_details
    put '/homes/:house_id/rooms/:id(.:format)' => 'rooms#update'
    post '/homes/:house_id/rooms/:id/reorder_images(.:format)' => 'rooms#reorder_images'
    post '/homes/:house_id/rooms/:id/upload_room_image(.:format)' => 'rooms#upload_room_image'
    delete '/homes/:house_id/rooms/:id(.:format)' => 'rooms#destroy'

    get "/projects/:project/rooms/:id/images/(.:format)" => 'room_images#snapshots'

    get "/room_images/:id(.:format)" => 'room_images#show'
    delete "/room_images/:id(.:format)" => 'room_images#destroy'
    post "/room_images/:id/notes(.:format)" => 'room_images#create_note'
    put "/room_images/:id/notes/:note_id(.:format)" => 'room_images#update_note'
    post "/room_images/:id/reorder_notes(.:format)" => 'room_images#reorder_notes'
    delete "/room_images/:id/notes/:note_id(.:format)" => 'room_images#destroy_note'

    post '/trade_accounts' => 'trade_accounts#create'

    get '/inventory' => 'inventory_items#index'
    get '/inventory-items' => 'inventory_items#index'
    get '/inventory-items/new' => 'inventory_items#new'
    get '/inventory-items/request-info' => 'inventory_items#new_request_info'
    get '/inventory-items/:id(.:format)' => 'inventory_items#show'
    get '/inventory_items/:id(.:format)' => 'inventory_items#show'
    get '/inventory-items/:id/edit(.:format)' => 'inventory_items#edit', as: :item_edit
    get '/inventory_items/:id/edit(.:format)' => 'inventory_items#edit'
    get '/inventory-items/:id/images(.:format)' => 'inventory_items#images'
    get '/inventory-items/:id/categories(.:format)' => 'inventory_items#categories'
    post '/inventory-items/:id/categories(.:format)' => 'inventory_items#add_category'

    get '/inventory-items/:id/conditions(.:format)' => 'inventory_items#conditions'

    get '/inventory-items/:id/periods(.:format)' => 'inventory_items#periods'

    get '/inventory-items/:id/materials(.:format)' => 'inventory_items#materials'
    post '/inventory-items/:id/materials(.:format)' => 'inventory_items#add_material'
    delete '/inventory-items/:id/materials/:material_id(.:format)' => 'inventory_items#delete_material'

    post '/inventory-items' => 'inventory_items#create'
    post '/inventory-items/request-info' => 'inventory_items#request_info'
    put '/inventory-items/:id(.:format)' => 'inventory_items#update'
    post '/inventory-items/:id/upload_item_image(.:format)' => 'inventory_items#upload_item_image'
    get '/inventory-items/:id/care_documents(.:format)' => 'inventory_items#care_documents'
    get '/inventory-items/:id/invoice_documents(.:format)' => 'inventory_items#invoice_documents'
    get '/inventory-items/:id/warranty_documents(.:format)' => 'inventory_items#warranty_documents'
    post '/inventory-items/:id/upload_care_document(.:format)' => 'inventory_items#upload_care_document'
    post '/inventory-items/:id/upload_invoice_document(.:format)' => 'inventory_items#upload_invoice_document'
    post '/inventory-items/:id/upload_warranty_document(.:format)' => 'inventory_items#upload_warranty_document'
    post '/inventory-items/:id/reorder_images(.:format)' => 'inventory_items#reorder_images'
    delete '/inventory-items/:id/images/:image_id(.:format)' => 'inventory_items#delete_image'
    delete '/inventory-items/:id/documents/:doc_id(.:format)' => 'inventory_items#delete_document'
    delete '/inventory-items/:id/categories/:cat_id(.:format)' => 'inventory_items#delete_category'

    get '/inventory-items/:id/provenance_documents(.:format)' => 'inventory_items#provenance_documents'
    post '/inventory-items/:id/upload_provenance_document(.:format)' => 'inventory_items#upload_provenance_document'

    get '/ping' => 'ping#index'

  end


  namespace :nest do
    get '/oath/redirect' => "oath#redirect"
  end


  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
