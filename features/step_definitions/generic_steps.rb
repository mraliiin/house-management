Given /^I wait for (\d+) seconds?$/ do |n|
  sleep(n.to_i)
end

Given /^I go to the home page$/ do
  visit "/trade/"
end

Given /^I disable webmock$/ do
  WebMock.allow_net_connect!
end

Then(/^I should see "(.*?)" on the page$/) do |message|
  expect(page).to have_text(message)
end
