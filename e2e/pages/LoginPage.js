// file: e2e/pages/LoginPage.js

class LoginPage {
  emailInput() {
    return cy.get('input[name="email"]');
  }

  passwordInput() {
    return cy.get('input[name="password"]');
  }

  loginButton() {
    return cy.get('button[type="submit"]');
  }

  visit() {
    cy.visit("/login");
  }

  login(email, password) {
    this.emailInput().clear().type(email);
    this.passwordInput().clear().type(password);
    this.loginButton().click();
  }

  verifyOnPage(page) {
    cy.location("pathname").should("include", page);
  }

  verifyMessageIsVisible(message) {
    cy.contains("body", message).should("be.visible");
  }
}

export default new LoginPage();
