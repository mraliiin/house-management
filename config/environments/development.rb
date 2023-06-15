Rails.application.configure do
  # Settings specified here will take precedence over those in config/application.rb.

  config.action_controller.perform_caching = true
  config.cache_store = :mem_cache_store, "localhost:11211"

  # In the development environment your application's code is reloaded on
  # every request. This slows down response time but is perfect for development
  # since you don't have to restart the web server when you make code changes.
  config.cache_classes = false

  # Do not eager load code on boot.
  config.eager_load = false

  # Show full error reports and disable caching.
  config.consider_all_requests_local       = true
  config.action_controller.perform_caching = false

  # Don't care if the mailer can't send.
  config.action_mailer.raise_delivery_errors = true

  config.action_mailer.delivery_method = :smtp
  config.action_mailer.smtp_settings = {
      address:              'email-smtp.us-east-1.amazonaws.com',
      port:                 25,
      domain:               'housepadapp.com',
      user_name:            'AKIAIRKZPCJFI5N3CPLA',
      password:             'AkskuzwhxWmggnvhfiTvGx++VSLXxluOE6Wvx/ikaNjQ',
      authentication:       :login,
      enable_starttls_auto: true  }

  # Print deprecation notices to the Rails logger.
  config.active_support.deprecation = :log

  # Debug mode disables concatenation and preprocessing of assets.
  # This option may cause significant delays in view rendering with a large
  # number of complex assets.
  config.assets.debug = true

  # Asset digests allow you to set far-future HTTP expiration dates on all assets,
  # yet still be able to expire them through the digest params.
  config.assets.digest = false

  # Adds additional error checking when serving assets at runtime.
  # Checks for improperly declared sprockets dependencies.
  # Raises helpful error messages.
  config.assets.raise_runtime_errors = true

  # Raises error for missing translations
  # config.action_view.raise_on_missing_translations = true


  Braintree::Configuration.environment = Rails.application.secrets.braintree_environment
  Braintree::Configuration.merchant_id = Rails.application.secrets.braintree_merchant_id
  Braintree::Configuration.public_key = Rails.application.secrets.braintree_public_key
  Braintree::Configuration.private_key = Rails.application.secrets.braintree_private_key

end
