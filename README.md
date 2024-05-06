## **AQA technology stack:**

- Main programming language: Typescript;
- Test framework: Playwright;
- Reporter: Playwright, Allure;

## Installation and running

1. Before running the automation tests, need to clone remote repository to your local machine:

- Run "git clone git@" command

2. Then need to set up all needed packages:

- Run "npm install"

3. Establish Playwright by running the next command:

- npx playwright

4. For running the automation tests:

- Run "npm run test"

Notes: Tests will be running in local environment, need to add ".env" file.

5. To generate Allure report:

- Run "npm run report"

6. To delete allure-reports and allure-results folders.

- Run "npm run clear"
