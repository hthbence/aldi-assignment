# Frontend Testing

## Overview and Approach

This project contains end-to-end tests for the Login functionality of a web application built using Angular.

I chose Playwright with TypeScript and structured the project with POMs and fixtures.

The goal was to keep the project reasonably simple for an assignment, without going too professional just for the sake of it, but with maintainability and scaleability in mind.

The framework can therefore be extended without fundamentally changing the structure. Additional pages, fixtures and test scenarios can be introduced as the tests grow.

Because the URL and credentials were not provided as part of the assignment, the framework was created with configurable placeholders.

## Framework Setup

Since all the necessary prerequisites were already installed on my machine, I started by creating a Playwright project using the standard Playwright setup:

```
npm init playwright@latest
```

I selected the standard setup options provided by Playwright.

I kept the setup relatively lightweight. The assignment was focused on a small login feature, so I avoided adding unnecessary frameworks or libraries that would make the project more complicated without providing meaningful value.

## Playwright Configuration

The main Playwright configuration is located in:

```
playwright.config.ts
```

I configured the application URL through an environment variable rather than hardcoding it in the Playwright configuration.

This allows the same test suite to be executed against different environments without changing the test code.

```typescript
baseURL: process.env.BASE_URL,
```

I also added:

```typescript
screenshot: 'only-on-failure',
video: 'retain-on-failure',
```

### Screenshots

Screenshots are captured when a test fails.

I chose `only-on-failure` because taking screenshots for every successful test would create unnecessary test artifacts. When a test fails, however, the screenshot provides useful information about the state of the application at the time of failure.

### Video

Videos are retained when a test fails.

This provides another useful artifact, particularly for UI tests where the sequence of actions leading to the failure can be important.

## TypeScript Configuration

Playwright did not create a `tsconfig.json` during the initial setup, so I added one.

I kept it minimal:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "types": ["node", "@playwright/test"],
    "strict": true,
    "esModuleInterop": true
  }
}
```

## Environment Configuration

Environment configuration is handled in:

```
utilities/env.ts
```

The purpose of this file is to provide a single place where required environment variables are read and validated.

The environment variables are also deliberately kept outside the test code. This means the same test suite can be used with different environments and test accounts without modifying the tests.

## Page Object Models

The page object models are located under:

```
pages/
```

I used the Page Object Model because it separates test behaviour from UI implementation details.

This also makes the suite easier to maintain. If a locator changes, the change should normally be made in the relevant POM, rather than in every test that uses it.

### LoginPage

The login page is represented by:

```
pages/LoginPage.ts
```

The page object contains the locators and actions associated with the login functionality.

### FrontPage

The page reached after a successful login is represented by:

```
pages/FrontPage.ts
```

The responsibility of this page object is to verify that the user successfully reached the authenticated part of the application.

## Playwright Fixtures

The custom fixture is located in:

```
fixtures/login-fixtures.ts
```

Playwright already provides a `page` fixture. I extended the standard Playwright test fixture to provide the page objects directly to the tests.

The custom fixtures currently provide:

- `loginPage`
- `frontPage`

This means the test can receive the required page objects directly, rather then repeatedly creating them manually.

This is particularly useful as the test suite grows.

## Login Tests

The actual tests are located in:

```
tests/login/login.spec.ts
```

Currently, there are two scenarios.

### Successful Login

The first test verifies that a user can successfully login using valid credentials.

### Invalid Password

The second test verifies that authentication fails when the user enters an incorrect password.

## Browser Coverage

The Playwright configuration contains three browser projects:

- Chromium
- Firefox
- WebKit

This allows the same functional tests to be executed across multiple browser engines.

## Running the Tests

Once the required environment variables are available, the entire suite can be executed with:

```
npx playwright test
```

To see the browser while the tests execute:

```
npx playwright test --headed
```

If the environmental variables are not available, then we can define them as such when running the tests:

```
BASE_URL= \
EMAIL= \
PASSWORD= \
WRONG_PASSWORD= \
npx playwright test 
```

To run the tests in a specific browser:

```
npx playwright test --project=chromium
```

After execution, Playwright generates an HTML test report.
