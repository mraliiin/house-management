Feature: Activation

  As a non trade user
  I want to be able to activate a Trade account
  So that I can use the Trade platform

  Background:
    Given I login as a non trade user

  @javascript
  Scenario:
    Given I go to the home page
    And I wait for 3 seconds
    Then I should be redirected to the activation page

  @javascript
  Scenario:
    Given I go to the home page
    And I wait for 5 seconds
    And I agree to the terms
    And I enter the company name
    And I enable activation webmock
    And I wait for 3 seconds
    And I click Continue
    And I wait for 3 seconds
    Then I should see "Congratulations" on the page
    And I disable webmock

