const { exec } = require("child_process");
// exec(`cucumber-json-merge --out merged.json cypress/cucumber-json/rapid7_homepage.cucumber.json cypress/cucumber-json/divvycloud_homepage.cucumber.json`)
function createcucumberReports(featurename) {
var reporter = require('cucumber-html-reporter');

var feature = featurename;

var options = {
        theme: 'bootstrap',
        jsonFile: `${feature}.json`,
        output: `${feature}.html`,
        reportSuiteAsScenarios: true,
        scenarioTimestamp: true,
        launchReport: true,
        metadata: {
            "App Version":"0.3.2",
            "Test Environment": "LOCAL",
            "Browser": "Chrome  Version 87.0.4280.141",
            "Platform": "MacOS",
            "Parallel": "Scenarios",
            "Executed": "Remote"
        }
    };
reporter.generate(options);
}

createcucumberReports("cucumber-report");