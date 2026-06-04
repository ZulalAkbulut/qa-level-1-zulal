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
    
  @validation @negative @scheduled @date
  Scenario Outline: Invalid date should prevent transfer creation
    When login with role "Admin"
    And navigate to the bank transfer form page
    And fill the transfer form with beneficiary "John Admin", iban "FR9834567891234", label "Alpha" and amount "100.00"
    And select the "<mode>" transfer mode
    And enter the dynamic transfer date for "<dateKeyword>"
    And click the submit transfer button
    Then a validation error message "<message>" should be displayed

    Examples:
      | mode      | dateKeyword | message                                         |
      | scheduled | yesterday   | Date cannot be in the past                      |
      | scheduled | 100         | Date cannot be more than 90 days in the future  |
  
   @validation @negative @iban
  Scenario Outline: Invalid IBAN should prevent transfer creation
    When login with role "Admin"
    And navigate to the bank transfer form page
    And fill the transfer form with beneficiary "John Admin", iban "<iban>", label "Alpha" and amount "100.00"
    And select the "instant" transfer mode
    And click the submit transfer button
    Then a validation error message "<message>" should be displayed

    Examples:
      | iban                               | message                                                          |
      | FR12345678912                      | Transfer is failed. The Iban must be 14-34 character             |
      | FR12345678912345678912345678912345 | Transfer is failed. The Iban must be 14-34 character             |
      | FR12@4567891234565874              | Transfer is failed. The Iban can not include specials characters |

  @validation @negative @amount
  Scenario Outline: Invalid amount should prevent transfer creation
    When login with role "Admin"
    And navigate to the bank transfer form page
    And fill the transfer form with beneficiary "John Admin", iban "FR1234567891234", label "Alpha" and amount "<amount>"
    And select the "instant" transfer mode
    And click the submit transfer button
    Then a validation error message "<message>" should be displayed

    Examples:
      | amount    | message                              |
      |         0 | Transfer failed, zero is not allowed |
      |      0.00 | Transfer failed, below minimum       |
      |       -10 | Transfer failed, negative value      |
      | 100000.01 | Transfer failed, above maximum       |

  @rbac @negative
  Scenario: Unauthorized users should not access bank transfer feature
    When login with role "Viewer"
    Then the bank transfer navigation should not be visible in the UI


