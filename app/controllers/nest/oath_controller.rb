class Nest::OathController < ApplicationController
  skip_before_filter :require_login

  def redirect

    conn = Excon.new("https://api.home.nest.com")
    response = conn.post(path: "/oauth2/access_token?client_id=#{Rails.application.secrets.nest_client_id}&code=#{params[:code]}&client_secret=#{Rails.application.secrets.nest_client_secret}&grant_type=authorization_code",
                         body: "",
                         headers: { "Content-Type" => "application/json", "Accept-Encoding" => "application/json" },
                         persistent: true)

    Rails.logger.info "RESPONSE: #{response.inspect}"

    res = JSON.parse response.body
    access_token = res[:access_token]

    Rails.logger.info "access_token: #{access_token}"

    redirect_to "/trade/homes/454"
  end

end
