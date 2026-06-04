# Bank Transfer QA Automation (Cypress + Cucumber)

## 📌 Overview
This project is a test automation suite for a Bank Transfer feature.  
It validates core business rules such as successful transfers, scheduled transfers, input validations, and role-based access control.

The tests are written using:
- Cypress (JS)
- Cucumber (BDD style)
- Page Object Model (POM)

---

## 🧪 Covered Scenarios

The test suite focuses on 4 main areas:

### 1. Happy Path - Instant Transfer
- Valid transfer with authorized roles (Admin, Manager)
- Ensures successful transaction message is displayed

### 2. Happy Path - Scheduled Transfer
- Transfer scheduled for tomorrow
- Validates date handling and success message

### 3. Input Validation (Negative Tests)
- Invalid IBAN formats (too short, too long, special characters)
- Invalid amounts (0, negative values, above maximum)
- Ensures proper validation error messages are shown

### 4. Role-Based Access Control (RBAC)
- Ensures unauthorized users (e.g. Viewer) cannot access transfer functionality

---

## 🏗️ Project Structure
```text
e2e/
├── features/
│   ├── bank_transfer.feature
│   └── login_test.js
├── pages/
│   ├── BankTransferPage.js
│   └── LoginPage.js
├── step_definitions/
│   ├── bankTransferSteps.js
│   └── loginSteps.js
└── support/
    ├── commands.js
    ├── e2e.js
    └── userCredentials.js
```
---

## 🧱 Design Approach

### Page Object Model (POM)
UI interactions are abstracted into page classes to improve reusability and maintainability.

### Custom Commands
Reusable Cypress commands are used for common actions like login.

### Data Separation
User roles and credentials are stored separately to keep tests clean and readable.

---

## ▶️ How to Run

Install dependencies:
```bash
npm install
``` 
Run Cypress tests:
```bash
npx cypress open
``` 
Or headless mode:
```bash
npx cypress run
``` 
## 💡 Notes

In real-world projects, sensitive data (credentials) would be managed via environment variables or CI/CD secrets.

The implementation prioritizes simplicity and readability appropriate for a QA automation assessment.