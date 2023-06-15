Given(/^I go to the account details page$/) do
  visit '/trade/settings/account-details'
end

When(/^I change the first name to "(.*?)"$/) do |first_name|
  fill_in("First name", with: first_name)
end

When(/^I click Update$/) do
  click_button("Update")
end

Then(/^I should see "(.*?)"$/) do |updated_message|
  expect(page.find("#account-info-feedback")).to have_text(updated_message)
end

Then(/^I should see "(.*?)" in the header$/) do |first_name|
  expect(page.find("#user-info-container")).to have_text(first_name)
end