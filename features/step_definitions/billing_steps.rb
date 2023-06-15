When /^I reset the new trade user braintree account$/ do
  # u = User.find_by_email("gigi+6@housepadapp.com")
  # ta = TradeAccount.find_by_user_id(u.id)
  #
  # customer = Braintree::Customer.find(u.payment_customer_id)
  #
  # begin
  #   subscription = Braintree::Subscription.find(ta.braintree_trade_subscription_id)
  # rescue Braintree::NotFoundError
  #   subscription = nil
  # end
  #
  # unless subscription.nil?
  #   Braintree::Subscription.cancel(subscription.id)
  #   Braintree::PaymentMethod.delete(subscription.payment_method_token)
  # end
  #
  # unless customer.payment_methods.empty?
  #   Braintree::PaymentMethod.delete(customer.payment_methods[0].token)
  # end
  #
  # # reset subscription
  # ta.braintree_trade_subscription_id = nil
  # ta.save
end

When /^I go to the billing page$/ do
  visit "/trade/settings/billing"
end

When /^I click on the change plan button$/ do
  page.find("#btn-change-plan").click
end

When /^I confirm$/ do
  page.find("#btn-confirm-plan").click
end

When /^I select the #(.*?) plan$/ do |plan_index|
  page.find("#billing-info-modal .braintree-plan:nth-of-type(#{plan_index})").click
end

When /^I click on the activate plan button$/ do
  page.find("#btn-activate-plan").click
end

When /^I click next to go to payment$/ do
  page.find("#btn-braintree-plan-selected").click
end

When /^I click next to go to confirmation/ do
  page.find("#btn-braintree-plan-selected").click
end

When /^I click next to go back to plans$/ do
  page.find("#btn-back-to-plans").click
end

Then /^I should see a button with id "(.*?)"/ do |button_id|
  expect(page).to have_selector(button_id)
end

Then /^I should see the change plan popup$/ do
  expect(page).to have_selector("#billing-info-modal", visible: true)
  expect(page.find("#billing-info-modal")).to have_text("Select a plan")
end

Then /^I should see the update payment method popup$/ do
  expect(page).to have_selector("#billing-info-modal", visible: true)
  expect(page.find("#billing-info-modal")).to have_text("Payment method")
end

Then /^I should see "(.*?)" plans$/ do |plan_count|
  page.assert_selector(".braintree-plan", count: plan_count)
end

Then /^I should see no selected plans$/ do
  page.assert_selector(".braintree-plan.active", count: 0)
end

Then /^I should see the "(.*?)" plan selected$/ do |plan_value|
  expect(page.find(".braintree-plan.active")).to have_text(plan_value)
end

Then /^I should see the "(.*?)" plan active/ do |plan_value|
  expect(page).to have_text("#{plan_value}.00 per month")
end

Then /^The next button should be disabled$/ do
  page.assert_selector("#btn-braintree-plan-selected.disabled", count: 1)
end

Then /^I should see a back to plans button$/ do
  expect(page).to have_selector("#btn-back-to-plans")
end

Then /^I should see a back to payment button$/ do
  expect(page).to have_selector("#btn-back-to-payment")
end

Then /^I should see ".*?" on the popup$/ do |text|
  expect(page.find("#billing-info-modal")).to have_text(text)
end

Then /^I should see at least one transaction row$/ do
  page.assert_selector("#transaction-history tr", minimum: 1)
end

