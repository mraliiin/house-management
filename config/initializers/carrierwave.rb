CarrierWave.configure do |config|
  config.fog_credentials = {
      :provider               => 'AWS',                        # required
      :aws_access_key_id      => Rails.application.secrets.aws_access_key_id,                        # required
      :aws_secret_access_key  => Rails.application.secrets.aws_secret_access_key,                        # required
      # :region                 => 'eu-west-1',                  # optional, defaults to 'us-east-1'
      # :host                   => 's3.example.com',             # optional, defaults to nil
      # :endpoint               => 'https://housepad-shop.s3-website-us-east-1.amazonaws.com' # optional, defaults to nil
  }
  config.fog_directory  = Rails.application.secrets.s3_bucket                     # required
  config.fog_public     = false                                   # optional, defaults to true
  config.fog_attributes = {'Cache-Control'=>'max-age=315576000'}  # optional, defaults to {}
end

# Allow quality manipulation from uploaders
module CarrierWave
  module MiniMagick
    def quality(percentage)
      manipulate! do |img|
        img.quality(percentage.to_s)
        Rails.logger.debug "Setting compression to lossless!"
        img.compress("Lossless")
        img = yield(img) if block_given?
        img
      end
    end
  end
end