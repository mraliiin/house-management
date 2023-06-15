class SettingsController < ApplicationController

  # def index
  # end
  #
  # def account_details
  # end


  def billing
    # @braintree_customer_id = 56308911
    # @braintree_subscription_id = "hm8422"
    @braintree_plan = nil

    billing_info = @user.load_billing_info

    if billing_info.nil?
      render_json_internal_error("Failed to load billing info.")
    end

    @braintree_customer_id = billing_info["payment_customer_id"]
    @braintree_subscription_id = billing_info["trade_account"]["braintree_trade_subscription_id"]


    # Load braintree plans
    @braintree_plans = Util::BraintreeHelper.get_braintree_plans

    # Load subscription
    unless @braintree_subscription_id.nil?
      subscription = Braintree::Subscription.find(@braintree_subscription_id)
      payment_method = Braintree::PaymentMethod.find(subscription.payment_method_token)
      @braintree_plan = Util::BraintreeHelper.get_current_plan @braintree_plans, subscription.plan_id
    end


    # Prepare subscription client object
    @braintree_subscription = nil
    unless subscription.nil?
      @braintree_subscription = {next_billing_period_amount: subscription.next_billing_period_amount,
                              next_billing_date: subscription.next_billing_date.to_date.strftime("%m/%d/%Y"),
                              payment_method: {card_type: payment_method.card_type, last_4: payment_method.last_4, image_url: payment_method.image_url}}

      @braintree_subscription[:transactions] = Array.new
      subscription.transactions.each do |transaction|
        transaction_hash = {  amount: transaction.amount,
                              billing_period_start_date: transaction.subscription_details.billing_period_start_date.to_date.strftime("%m/%d/%Y"),
                              billing_period_end_date: transaction.subscription_details.billing_period_end_date.to_date.strftime("%m/%d/%Y"),
                              created_at: transaction.created_at.in_time_zone("America/New_York").strftime("%m/%d/%Y %I:%M:%S %p %Z"),
                              credit_card: {card_type: transaction.credit_card_details.card_type, last_4: transaction.credit_card_details.last_4, image_url: transaction.credit_card_details.image_url}}
        @braintree_subscription[:transactions] << transaction_hash
      end

      unless @braintree_plan.nil?
        @braintree_subscription[:plan] = @braintree_plan
      end
    end


    # Generate client token
    if @braintree_customer_id.blank?
      @braintree_client_token = Braintree::ClientToken.generate()
    else
      @braintree_client_token = Braintree::ClientToken.generate(customer_id: @braintree_customer_id)
    end
  end

  def update_payment_method
    #If no customer id, create customer
    if params[:customer_id].blank?

      result = Braintree::Customer.create(
          :first_name => @user.first_name,
          :last_name => @user.last_name,
          :payment_method_nonce => params[:payment_method_nonce]
      )
      if result.success?
        render json: {customer_id: result.customer.id}
      else

        verification = result.credit_card_verification
        if verification.status.eql? "processor_declined"
          render_json_internal_error(verification.processor_response_text)
        elsif verification.status.eql? "gateway_rejected"
          render_json_internal_error(verification.gateway_rejection_reason)
        else
          render_json_internal_error("Unknown error.")
        end

      end

    #otherwise update payment method
    else
      # result = Braintree::Customer.update(
      #     params[:customer_id],
      #     :payment_method_nonce => params[:payment_method_nonce]
      # )
      # if result.success?
        head :no_content
      # else
      #   render_json_internal_error(result.errors)
      # end

    end
  end

end
