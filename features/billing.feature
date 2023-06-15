@javascript
Feature: Billing

  As a trade user
  I want to use the billing settings
  So that I can manage my subscription

  Scenario:
    Given I am logged in as a valid trade user
    When I go to the billing page
    Then I should see a button with id "#btn-change-plan"
    And I should see a button with id "#btn-configure-payment"
    And I should see "Transaction history" on the page
    And I should see at least one transaction row

  Scenario:
    Given I am logged in as a valid trade user
    When I go to the billing page
    And I click on the change plan button
    Then I should see the change plan popup
    And I should see "2" plans
    And I should see the "$300" plan selected


  Scenario:
    Given I am logged in as a valid trade user
    When I go to the billing page
    And I click on the change plan button
    And I select the #2 plan
    And I confirm
    And I wait for 5 seconds
    Then I should see the "$450" plan active
    And I click on the change plan button
    And I select the #1 plan
    And I confirm
    And I wait for 5 seconds
    Then I should see the "$300" plan active

  Scenario:
    Given I am logged in as a new trade user
    When I go to the billing page
    Then I should see a button with id "#btn-activate-plan"

  Scenario:
    Given I am logged in as a new trade user
    When I go to the billing page
    And I click on the activate plan button
    Then I should see the change plan popup
    And I should see "2" plans
    And I should see no selected plans
    And The next button should be disabled

  Scenario:
    Given I am logged in as a new trade user
    When I go to the billing page
    And I click on the activate plan button
    And I select the #1 plan
    And I click next to go to payment
    Then I should see the update payment method popup
    And I should see a back to plans button

  Scenario:
    Given I am logged in as a new trade user
    When I go to the billing page
    And I click on the activate plan button
    And I select the #1 plan
    And I click next to go to payment
    And I wait for 3 seconds
    And I click next to go back to plans
    And I wait for 2 seconds
    Then I should see "2" plans
    And I should see the "$300" plan selected

#  @javascript
#  Scenario:
#    Given I am logged in as a new trade user
#    When I go to the billing page
#    And I click on the activate plan button
#    And I select the #1 plan
#    And I click next to go to payment
#    And I wait for 3 seconds
##    And I enter credit card details
#    And I click next to go to confirmation
#    Then I should see a back to payment button
#    And I should see "$500.00 Signup fee" on the popup
#    And I should see "$300.00 per month" on the popup
#    And I should see "Visa ending in **11" on the popup



