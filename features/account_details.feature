Feature: Account Details

  As a user
  I want to be able to edit my account details
  So that I can have up to date information

  Background:
    Given I am logged in as a valid trade user


  @javascript
  Scenario:
    Given I go to the account details page
    When I change the first name to "Adrian Cucumber"
    And I click Update
    Then I should see "Account info updated."
    And I should see "Adrian Cucumber" in the header
    And I change the first name to "Adrian"
    And I click Update
    And I should see "Adrian" in the header


