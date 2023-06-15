Given(/^I go to the login page$/) do
  visit '/trade/login'
end


When(/^I submit "(.*?)" and "(.*?)"$/) do |login, password|
  fill_in("Email", with: login)
  fill_in("Password", with: password)
  click_button("Login")
end


Then(/^I should be "(.*?)"$/) do |login_status|
  if login_status == "logged in"
    expect(page).to have_no_selector("form#login-form")
  else
    expect(page).to have_css("form#login-form")
  end
end


Given(/^I am logged in as a valid trade user$/) do
  visit '/trade/login'
  # sleep(2)
  fill_in("Email", with: "gigi@gmail.com")
  fill_in("Password", with: "12345678")
  click_button("Login")
  # Wait for the javascript to be processed
  sleep(1)
end


Given(/^I login as a non trade user$/) do
  visit '/trade/login'
  fill_in("Email", with: "gigi+1@gmail.com")
  fill_in("Password", with: "12345678")
  click_button("Login")
  # Wait for the javascript to be processed
  sleep(1)
end

Given /^I am logged in as a new trade user$/ do
  visit '/trade/login'
  fill_in("Email", with: "gigi+6@housepadapp.com")
  fill_in("Password", with: "12345678")
  click_button("Login")
  # Wait for the javascript to be processed
  sleep(1)
end