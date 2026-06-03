import LoginPage from "../pages/LoginPage";
import { userCredentials } from "./userCredentials";

Cypress.Commands.add("loginAs", (role) => {
  const user = userCredentials[role];

  if (!user) {
    throw new Error(`Undefined role: ${role}`);
  }

  return LoginPage.login(user.email, user.password);
});