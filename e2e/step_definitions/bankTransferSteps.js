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
  BankTransferPage.submit();
});

Then("a success {string} should be displayed", (transferMessage) => {
  BankTransferPage.verifySuccess(transferMessage);
});
