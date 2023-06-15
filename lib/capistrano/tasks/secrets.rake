
# desc "Symlinks secrets.yml"
# namespace :deploy do
#   before :updated, :symlink_secrets do
#     on roles(:app) do |host|
#       execute "ln -nfs #{deploy_to}/shared/config/secrets.yml #{release_path}/config/secrets.yml"
#     end
#   end
# end
#
# desc "Symlinks database.yml"
# namespace :deploy do
#   before :updated, :symlink_db do
#     on roles(:app) do |host|
#       execute "ln -nfs #{deploy_to}/shared/config/database.yml #{release_path}/config/database.yml"
#     end
#   end
# end
