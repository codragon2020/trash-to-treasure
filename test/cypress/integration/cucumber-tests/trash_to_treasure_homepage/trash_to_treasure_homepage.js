/// <reference types="cypress" />

import { And, Given, Then, When } from "cypress-cucumber-preprocessor/steps";

Then(`I should see page title as {string}`, (title) => {
  cy.title().should("eq", title);
});


//Assert banner text content
Then(`navbar should display {string}`, (bannerText) => {
//assert navbar displays correct text
cy.get('.navbar-brand').contains(bannerText);

});