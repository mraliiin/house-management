json.subscription do
  json.next_billing_period_amount @braintree_subscription.next_billing_period_amount
  json.next_billing_date @braintree_subscription.next_billing_date.to_date.strftime("%m/%d/%Y")
  json.payment_method do
    json.card_type @payment_method.card_type
    json.last_4 @payment_method.last_4
    json.image_url @payment_method.image_url
  end
  json.plan @braintree_plan
end