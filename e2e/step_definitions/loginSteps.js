import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import LoginPage from "../pages/LoginPage";

Given("the user is on the login page", () => {
  LoginPage.visit();
});

When("login with role {string}", (role) => {
  cy.loginAs(role);
});

Then("the message {string} is displayed", (message) => {
  LoginPage.verifyMessageIsVisible(message);
});

Then("should be on the {string}", (page) => {
  LoginPage.verifyOnPage(page);
});
