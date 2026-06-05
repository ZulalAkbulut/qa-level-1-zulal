import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import BankTransferPage from "../pages/BankTransferPage.js";

Given("navigate to the bank transfer form page", () => {
  BankTransferPage.navigateToForm();
});

When(
  "fill the transfer form with beneficiary {string}, iban {string}, label {string} and amount {string}",
  (beneficiary, iban, label, amount) => {
    BankTransferPage.fillFormWithData({ beneficiary, iban, label, amount });
  },
);

When("select the {string} transfer mode", (mode) => {
  BankTransferPage.getModeRadioButton(mode).check();
});

When("click the submit transfer button", () => {
  cy.intercept("POST", "**/api/transfers").as("createTransfer");
  BankTransferPage.submit();
  cy.wait("@createTransfer")
    .its("response.statusCode")
    .should("eq", 201);
});

Then("a success {string} should be displayed", (transferMessage) => {
  BankTransferPage.verifySuccess(transferMessage);
});

When("enter the dynamic transfer date for {string}", (dateKeyword) => {
  BankTransferPage.enterDynamicDate(dateKeyword);
});

Then("a validation error message {string} should be displayed", (errorMessage) => {
  BankTransferPage.verifyError(errorMessage);
});

Then("the bank transfer navigation should not be visible in the UI", () => {
  BankTransferPage.navTransferLink.should("not.exist");
});