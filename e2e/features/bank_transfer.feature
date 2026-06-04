@transfer
Feature: Bank Transfer Creation

  Background:
    Given the user is on the login page

  @happy_path @instant
  Scenario Outline: Successful instant bank transfer with authorized roles
    When login with role "<role>"
    And navigate to the bank transfer form page
    And fill the transfer form with beneficiary "<beneficiary>", iban "<iban>", label "<label>" and amount "<amount>"
    And select the "<mode>" transfer mode
    And click the submit transfer button
    Then a success "<transferMessage>" should be displayed

    Examples:
      | role    | beneficiary  | iban            | label | amount  | mode    | transferMessage                  |
      | Admin   | John Admin   | FR1234567891234 | Alpha | 1000.00 | instant | Transfer completed successfully. |
      | Manager | Jane Manager | FR9834567891234 | Beta  | 2000.50 | instant | Transfer completed successfully. |

  @happy_path @scheduled @date
  Scenario Outline: Successful scheduled bank transfer for tomorrow
    When login with role "<role>"
    And navigate to the bank transfer form page
    And fill the transfer form with beneficiary "<beneficiary>", iban "<iban>", label "<label>" and amount "<amount>"
    And select the "<mode>" transfer mode
    And enter the dynamic transfer date for "<dateKeyword>"
    And click the submit transfer button
    Then a success "<transferMessage>" should be displayed

    Examples:
      | role    | beneficiary  | iban            | label | amount  | mode      | dateKeyword | transferMessage                  |
      | Admin   | John Admin   | FR1234567891234 | Alpha | 1000.00 | scheduled | tomorrow    | Transfer completed successfully. |
      | Manager | Jane Manager | FR9834567891234 | Beta  | 3500.00 | scheduled | tomorrow    | Transfer scheduled successfully. |
