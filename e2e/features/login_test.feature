Feature: Login to the platform

Background:
  Given the user is on the login page

Scenario: Successful login with valid credentials
  When login with role "Admin"
  Then should see the message "Welcome admin@example.com"
  Then should be on the "home"

Scenario: Failed login with incorrect password
  Given login with role "Unauthenticated User"
  Then should see the message "Invalid credentials"
  