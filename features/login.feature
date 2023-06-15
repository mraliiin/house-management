Feature: Login

  As a trade user
  I want to be able to login
  So that I can use the Trade platform

  @javascript
  Scenario Outline: Different login combinations should produce different results
    Given I go to the login page
    When I submit "<login>" and "<password>"
    Then I should be "<login_status>"

  Scenarios: login combinations
    | login | password | login_status |
    | gigi@gmail.com | 123456789 | not logged in |
    | gigi@gmail.com |  | not logged in |
    | gigi@gmail.com | 123 | not logged in |
    |  | 123 | not logged in |
    | gigi@gmail.com | 12345678 | logged in |
