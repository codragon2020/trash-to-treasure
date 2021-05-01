/// <reference types="cypress" />

import { And, Given, Then } from "cypress-cucumber-preprocessor/steps";

Cypress.on("uncaught:exception", (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});

Given(`I go to trashtotreasure homepage`, () => {
  const url = Cypress.env("divvyURL");
  cy.visit(url);
});

Then(`I should see page title as {string}`, (title) => {
  cy.title().should("eq", title);
});


//Assert banner text content
Then(`navbar should display {string}`, (bannerText) => {
//assert navbar displays correct text
cy.get('.navbar-brand').contains(bannerText);

});
