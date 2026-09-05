# API Testing

## Overview and Approach

This project contains a small API test suite.

My approach to this task was to keep the solution focused on the behaviour that provides the most value.

I started with the four endpoints requested by the assignment and covered the main successful CRUD flows. Then I added four negative scenarios around invalid data and non-existent resources.

I also separated the configuration and test data from the test implementation. This makes the tests easier to maintain.

The implementation focuses on validating the endpoint status, the HTTP response and the response payload.

## Assumptions

Since the assignment does not provide a URL or API specification, the request/response fields and expected status codes used in the tests are treated as assumptions.

| Endpoint           | Expected Status | Expected Response         |
| ------------------ | --------------- | ------------------------- |
| POST /tasks        | 201             | Created task              |
| GET /tasks/{id}    | 200             | Requested task            |
| PUT /tasks/{id}    | 200             | Updated task              |
| DELETE /tasks/{id} | 204             | No response body          |
| Invalid request    | 400             | Validation/error response |
| Resource not found | 404             | Error response            |

## Project Setup

The project was created using the standard Playwright setup.

```
npm init playwright@latest
```

During setup I selected:

- TypeScript
- Tests folder: `tests`
- No GitHub Actions workflow
- No browsers

The example Playwright test generated during setup was removed.

I also added a `tsconfig.json` because it was not provided by default.

## Playwright Configuration

The project configuration lives in:

```
playwright.config.ts
```

Contains the Playwright configuration, including:

- Test directory
- Parallel execution
- Retries in CI
- HTML reporting
- API base URL
- Trace configuration

The API base URL is configured through an environment variable:

```typescript
baseURL: process.env.API_BASE_URL
```

This means the test code does not need to contain environment-specific URLs.

This is particularly useful in projects where the same tests may run against development, staging and even live environments.

## Project Structure

### Tests

```
tests/tasks.spec.ts
```

Contains the API test scenarios.

The required CRUD endpoints are covered here, together with a small number of negative scenarios.

I kept the endpoint tests in a single .spec file because the assignment is small and all tests point to the same resource. For a larger API, I would normally split tests by resource or functional area to keep the suite easier to maintain.

### Test Data

```
test-data/test-data.ts
```

Contains reusable request payloads.

Keeping the test data separate from the test implementation makes the tests easier to read and maintain.

### Test Configuration

```
test-config/test-config.ts
```

Contains configuration including:

- Task IDs
- Non-existent task ID
- Expected HTTP status codes

This is kept separate so that it's easier to change when needed.

## Test Coverage

I created both positive and negative scenarios, but kept them in a separate describe.

### Positive Scenarios

#### 1. Create a task

```
POST /tasks
```

The test sends a valid task payload and verifies:

- Expected HTTP status
- Response contains an ID
- Returned title matches the submitted title
- Returned description matches the submitted description
- Returned completion state matches the submitted value

#### 2. Retrieve a task

```
GET /tasks/{id}
```

The test verifies:

- Expected HTTP status
- Returned ID matches the requested ID
- Expected task properties are present

#### 3. Update a task

```
PUT /tasks/{id}
```

The test verifies:

- Expected HTTP status
- The task ID remains unchanged
- Updated fields contain the expected values

#### 4. Delete a task

```
DELETE /tasks/{id}
```

The test verifies that the API returns the expected successful response.

### Negative Scenarios

The scenarios cover:

- Attempting to create a task with invalid data
- Requesting a task that does not exist
- Updating a task that does not exist
- Deleting a task that does not exist

## Running the Tests

Run the API tests with a specific environment:

```
API_BASE_URL=https://example-api.com npx playwright test
```

Then to view the report:

```
npx playwright show-report
```
