worker_processes 4
timeout 86400

# listen "/tmp/shop_prod.sock", :backlog => 64
listen 8082

working_directory "/var/www/house-management/current"

pid "/var/lib/house-management-unicorn/unicorn.pid"

stderr_path "/var/log/house-management-unicorn/stderr.log"
stdout_path "/var/log/house-management-unicorn/stdout.log"

preload_app true

before_fork do |server, worker|
  defined?(ActiveRecord::Base) and
      ActiveRecord::Base.connection.disconnect!
end

after_fork do |server, worker|
  defined?(ActiveRecord::Base) and
      ActiveRecord::Base.establish_connection
end

# Instruct to keep processes from rubymine active for longer time to allow debugging
if ENV['IDE_PROCESS_DISPATCHER']
  timeout 30 * 60 * 60 * 24
end
