
# desc "Link log dir"
# namespace :deploy do
#   after :finished, :link_log do
#     on roles(:app) do |host|
#       execute "sudo rm -rf #{release_path}/log; sudo ln -s /var/log/house-management-unicorn/ #{release_path}/log"
#     end
#   end
# end

# desc "Restart unicorn server"
# namespace :deploy do
#   after :finished, :restart_unicorn do
#     on roles(:app) do |host|
#         execute "sudo systemctl restart house-management-unicorn"
#     end
#   end
# end

