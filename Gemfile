source 'https://rubygems.org'


# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '4.2.3'
gem 'rack', '~> 1.6.0'

# Use sqlite3 as the database for Active Record
# gem 'sqlite3'
# gem 'mysql2'

# Use SCSS for stylesheets and the bootstrap library
gem 'sass-rails', '>= 3.2'
gem 'bootstrap-sass', '~> 3.3.5'
gem 'autoprefixer-rails'

# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'
# Use CoffeeScript for .coffee assets and views
gem 'coffee-rails', '~> 4.1.0'
# See https://github.com/sstephenson/execjs#readme for more supported runtimes
# gem 'therubyracer', platforms: :ruby

# Use jquery as the JavaScript library
gem 'jquery-rails'
gem 'jquery-ui-rails'

gem 'marionette-rails'

# Turbolinks makes following links in your web application faster. Read more: https://github.com/rails/turbolinks
gem 'turbolinks'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.0'
# bundle exec rake doc:rails generates the API under doc/api.
gem 'sdoc', '~> 0.4.0', group: :doc

# Use ActiveModel has_secure_password
# gem 'bcrypt', '~> 3.1.7'


# Use dopzonejs for file uploads
gem 'dropzonejs-rails'
# Handle file uploads on server side with model integration and S3 uploads
gem 'carrierwave'
# Used by carrierwave for image versions
gem "mini_magick"
# Used by carrierwave for S3 uploads
gem "fog"

gem 'oj'
gem 'oj_mimic_json'

gem 'dalli'
gem 'excon'
gem 'activeresource'
gem 'rest-client'

group :development do
  gem 'capistrano-rails', '~> 1.1.1'
  gem 'capistrano3-unicorn'
end

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug'

  # Access an IRB console on exception pages or by using <%= console %> in views
  gem 'web-console', '~> 2.0'

  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
end

group :test do
  gem "factory_girl_rails", "~> 4.0"
  gem "rspec-rails"
  gem 'cucumber-rails', :require => false
  # database_cleaner is not required, but highly recommended
  # gem 'database_cleaner'
  gem 'capybara'
  gem 'selenium-webdriver'
  gem 'capybara-webkit'
  gem 'simplecov', :require => false
  gem 'webmock'
end

gem 'unicorn'
gem 'braintree'

gem 'exception_notification'

