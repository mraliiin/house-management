class UsersController < ApplicationController

  skip_before_filter :require_login, only: [:create]
  before_filter :enforce_json_format, only: [:update, :update_subscription]

  def create
    @user = HouseManagementApi::User.new(params[:user])
    res = @user.create

    if (res == true)
      @housepad_cookie = @user.get_user_cookie
    else
      render_json_internal_error res
    end

  rescue Exception => e
    render_json_internal_error "Failed to register account. #{e.message}"
  end


  def update
    if @user.update_attributes(params)
      head :no_content
    else
      render json: :update_failed, status: :unprocessable_entity
    end
  end


  def update_subscription
    # @braintree_customer_id = params[:customer_id]
    # @braintree_subscription_id = "hm8422"


    billing_info = @user.load_billing_info

    if billing_info.nil?
      render_json_internal_error("Failed to update subscription information.")
      return
    end

    @braintree_customer_id = billing_info["payment_customer_id"]
    @braintree_subscription_id = billing_info["trade_account"]["braintree_trade_subscription_id"]


    if @braintree_subscription_id.nil?
      result = Braintree::Subscription.create(
          payment_method_nonce: params[:payment_method_nonce],
          plan_id: params[:plan_id]
      )

      if result.success?
        #Update billing info
        if @user.update_billing_info({braintree_trade_subscription_id: result.subscription.id})
          @braintree_subscription = result.subscription
          @payment_method = Braintree::PaymentMethod.find(@braintree_subscription.payment_method_token)

          # Load braintree plans
          braintree_plans = Util::BraintreeHelper.get_braintree_plans
          @braintree_plan = Util::BraintreeHelper.get_current_plan braintree_plans, @braintree_subscription.plan_id

          render :subscription
        else
          render_json_internal_error "Failed to save subscription information."
        end
      else
        render_json_internal_error "Failed to create subscription."
      end

    elsif params[:payment_method_nonce]
      result = Braintree::Subscription.update(
          @braintree_subscription_id,
          payment_method_nonce: params[:payment_method_nonce])

      if result.success?
        payment_method = Braintree::PaymentMethod.find(result.subscription.payment_method_token)

        render json: {payment_method: {card_type: payment_method.card_type, last_4: payment_method.last_4, image_url: payment_method.image_url}}
      else
        render_json_internal_error "Failed to update subscription information."
      end

    elsif params[:plan_id]
      braintree_plan = nil
      plans = Braintree::Plan.all
      plans.each do |plan|
        if plan.id.eql?(params[:plan_id])
          braintree_plan = {id: plan.id, name: plan.name, description: plan.description, price: plan.price, active: true}
        end
      end

      result = Braintree::Subscription.update(
          @braintree_subscription_id,
          plan_id: params[:plan_id],
          price: braintree_plan[:price])

      if result.success?

        render json: {plan: braintree_plan,
                    subscription: {next_billing_date: result.subscription.next_billing_date.to_date.strftime("%m/%d/%Y"),
                                   next_billing_period_amount: result.subscription.next_billing_period_amount}}
      else
        render_json_internal_error "Failed to update subscription information."
      end
    end


  end


  def cancel_subscription

  end


  def upload_avatar

    uploader = TmpImageUploader.new
    uploader.set_store_dir(@user.id)
    begin
      uploader.store!(params[:file])
    rescue => e
      Rails.logger.error e.message
      render :upload_failed, status: :internal_server_error
    end

    @url = [Rails.application.secrets.s3_domain, Rails.application.secrets.s3_bucket, uploader.store_dir, params[:file].original_filename].join "/"
    @thumb_url = @url
    # @filename = "#{Rails.application.secrets.s3_domain}/#{Rails.application.secretss3_bucket}/#{uploader.store_dir}/#{params[:file].original_filename}"
  end

end
