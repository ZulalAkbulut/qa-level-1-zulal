class BankTransferPage {
  get navTransferLink() {
    return cy.get('[data-testid="nav-transfer"]');
  }

  get beneficiaryInput() {
    return cy.get('[data-testid="beneficiary-input"]');
  }

  get ibanInput() {
    return cy.get('[data-testid="iban-input"]');
  }

  get labelInput() {
    return cy.get('[data-testid="label-input"]');
  }

  get amountInput() {
    return cy.get('[data-testid="amount-input"]');
  }

  getModeRadioButton(mode) {
    return cy.get(`[data-testid="mode-${mode}"]`);
  }

  get submitButton() {
    return cy.get('[data-testid="transfer-submit-btn"]');
  }

  get successAlert() {
    return cy.get('[data-testid="success-alert"]');
  }

  navigateToForm() {
    this.navTransferLink.click();
  }

  fillFormWithData({ beneficiary, iban, label, amount }) {
    if (beneficiary != null) {
      this.beneficiaryInput.clear().type(beneficiary);
    }

    if (iban != null) {
      this.ibanInput.clear().type(iban);
    }

    if (label != null) {
      this.labelInput.clear().type(label);
    }

    if (amount != null) {
      this.amountInput.clear().type(String(amount));
    }
  }

  submit() {
    this.submitButton.click();
  }

  verifySuccess(message) {
    this.successAlert.should("be.visible").and("contain.text", message);
  }
}

export default BankTransferPage;
