class PingController < ApplicationController
  skip_before_filter :require_login

  def index
    render plain: "OK"
  end

end
