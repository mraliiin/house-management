class TradeAccountsController < ApplicationController

  def index
  end


  def create
    if @user.update_attributes({enable_trade_account: true})

      braintree_customer_id = "HP-APP-#{@user.id}"

      #try to find the customer first
      braintree_customer = nil
      begin
        braintree_customer = Braintree::Customer.find(braintree_customer_id)
      rescue Braintree::NotFoundError
        # Create Braintree customer
        result = Braintree::Customer.create(
            first_name: @user.first_name,
            last_name: @user.last_name,
            email: @user.email,
            phone: @user.phone,
            id: braintree_customer_id
        )

        if result.success?
          braintree_customer = result.customer
        end
      end

      head :no_content

      unless braintree_customer.nil?
        if @user.update_billing_info ({payment_customer_id: braintree_customer_id})
          head :no_content
        else
          render_json_internal_error "Failed to update billing info."
        end
      else
        render_json_internal_error "Failed to create billing records."
        return
      end
    else
      render json: :update_failed, status: :unprocessable_entity
    end
  end

end
