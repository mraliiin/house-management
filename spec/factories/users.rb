FactoryGirl.define do

  factory :user_gigi, class: HouseManagementApi::User do
    email "gigi@gmail.com"
    password "12345678"
  end

end
