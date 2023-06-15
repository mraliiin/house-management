module HouseManagementApi

  class ActiveResource::Connection
    alias :static_default_header :default_header

    def set_header(key, value)
      default_header.update(key => value)
    end

    def reset_header
      default_header = {}
    end
  end

  class CryptUtil

    def self.encrypt(key)
      crypt = ActiveSupport::MessageEncryptor.new(Rails.application.secrets["secret_key_base"])
      return crypt.encrypt_and_sign(key)
    end

    def self.decrypt(encrypted_string)
      crypt = ActiveSupport::MessageEncryptor.new(Rails.application.secrets["secret_key_base"])
      return crypt.decrypt_and_verify(encrypted_string)
    end
  end

end
