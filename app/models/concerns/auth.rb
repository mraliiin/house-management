module Auth
  extend ActiveSupport::Concern
  included do

  end

  class_methods do
    def find_by_id(user, id)
      authorized_request user do
        find(id)
      end
    end


    def authorized_request(user)
      connection.headers['User-Agent'] = 'DesignCarta web/client'
      connection.set_header('X-User-Email', user.email.empty? ? user.phone : user.email)
      connection.set_header('X-User-Token', user.auth_token)
      result = yield
    rescue => e
      Rails.logger.error e.message
      Rails.logger.error e.backtrace.join("\n")
      result = nil
    ensure
      connection.reset_header
      result
    end
  end
end
