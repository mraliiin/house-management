Then(/^I should be redirected to the activation page$/) do
  expect(page).to have_selector("#form-activation")
end

Given(/^I agree to the terms$/) do
  page.check("agree_terms")
end

Given(/^I enter the company name$/) do
  page.fill_in("Company name", with: "Iulia P Design")
end

Given /^I click Continue$/ do
  click_button("Continue")
end


Given /^I enable activation webmock$/ do
  WebMock.disable_net_connect!(allow: ["localhost", "127.0.0.1", /sandbox.braintreegateway.com/])

  user_data = { id: 31,
                first_name: "Iulia",
                last_name: "Parcalabu",
                phone: "40740326065",
                email: "gigi+1@gmail.com",
                avatar: {
                    url: nil,
                    thumb: {
                        url: nil
                    }
                },
                invited_by_id: nil,
                invitations_count: 0,
                parent_id: nil,
                company_id: nil,
                salutation: "Miss.",
                send_sms: true,
                notified_at: nil,
                trade_account: nil,
                invitation_accepted_at: nil }.to_json

  stub_request(:get, "http://dev.housepadapp.com/api/v2/users/31.json")
      .to_return(body: user_data, status: 200)


  stub_request(:put, "http://dev.housepadapp.com/api/v2/users/31.json?user%5Benable_trade_account%5D=true")
      .to_return(body: user_data, status: 200)


  stub_request(:put, "http://dev.housepadapp.com/api/v2/users/31/billing_info.json?payment_customer_id=HP-APP-31")
      .to_return(body: "", status: 200)
end
