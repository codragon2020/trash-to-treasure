import { And, Given, Then } from "cypress-cucumber-preprocessor/steps";

Given(`I generate report for all the features`, () => {
  const featurePath = "cypress/cucumber-json/";
  const reportpostfix = ".cucumber.json ";

  cy.fixture("features.json").then(function (data) {
    this.data = data;
    var features = data.featureslist;

    cy.log(JSON.stringify(features));
    // cy.wait(5000);
    var finalstring = "";
    for (var i = 0; i < features.length; i++) {
      var finalstring = finalstring + featurePath + features[i] + reportpostfix;
    }
    cy.exec("pwd");

    // cy.wait(10000);
    cy.exec(`cucumber-json-merge --out cucumber-report.json ${finalstring}`);

    //    cy.exec(`cucumber-json-merge --out cucumber-report.json divvycloud_guide.cucumber.json divvycloud_homepage.cucumber.json rapid7_homepage.cucumber.json divvycloud_chat_widget.cucumber.json `);

    cy.exec("node cucumber_json_to_html.js");
  });
});
