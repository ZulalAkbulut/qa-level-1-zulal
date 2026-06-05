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

  get transferDateInput() {
    return cy.get('[data-testid="transfer-date-input"]');
  }

  get errorAlert() {
    return cy.get('[data-testid="error-alert"]');
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

  verifyError(message) {
    this.errorAlert.should("be.visible").and("contain.text", message);
  }

  enterDynamicDate(dateKeyword) {
    const date = new Date();

    if (dateKeyword === "tomorrow") {
      date.setDate(date.getDate() + 1);
    } else if (dateKeyword === "yesterday") {
      date.setDate(date.getDate() + 1);
    } else if (typeof dateKeyword === "number") {
      let daysToAdd = Math.max(1, Math.min(dateKeyword, 90));
      date.setDate(date.getDate() + daysToAdd);
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;

    this.transferDateInput.clear().type(formattedDate);
  }

  verifySubmitButtonIsHidden() {
    this.submitButton.should("not.exist");
  }
}

export default new BankTransferPage();
