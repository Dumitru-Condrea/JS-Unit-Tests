# JS Unit Tests: Array Manipulation Demonstration

## Overview
This project is a comprehensive demonstration of JavaScript unit testing techniques, focusing on array manipulation and 
advanced testing strategies. Created by Dumitru Condrea, it showcases best practices in test-driven development, logging,
and modular code organization.

## Why This Matters

This project isn't just about array manipulation—it's a comprehensive demonstration of:

- Clean code principles
- Testable code design
- Modular architecture
- Advanced JavaScript techniques
- Sophisticated logging and testing strategies
- Automated GitHub Actions CI Workflows

## Project Structure

The project is organized into several key directories and modules:
- `src/`: Main source code for array manipulation
- `src/utils/`: Utility modules for logging, string manipulation, and more
- `test/`: Mocha test suites for validating array operations

## Key Features

- Advanced logging system with console and file output
- Colorized console logs
- Flexible test hooks and step tracking
- Random word generation for test data
- Comprehensive unit tests for array operations

## Technologies Used

- Node.js
- Mocha (Testing Framework)
- Chai (Assertion Library)
- Chalk (Console Styling)
- Random-words (Test Data Generation)
- Dotenv (Environment Configuration)

## Test Scenarios Covered

The test suite validates the following array operations:
1. Array initialization
2. Adding unique values
3. Removing values
4. Type conversion
5. Preventing duplicate entries

## Logging Capabilities

The project includes a sophisticated logging system that supports:
- Timestamped logs
- Multiple output modes (console, file, or both)
- Colorized log messages
- Configurable logging levels

The logging configuration is managed via the `logs-config.env` file, which is automatically updated based on the environment:
- **GitHub Actions**: When executing tests via GitHub Actions pipelines, the `logs-config.env` file is automatically populated with configuration values pulled from repository variables.
- **Local Environment**: When running tests locally, the configuration relies on local `.env` files or defaults, which can be customized manually.

This ensures that the configuration dynamically adapts to the environment, allowing for seamless operation both locally and during automated pipeline executions.

## Setup and Running Tests

1. Clone the repository `git clone <repository-url>`
2. Download and install [Node.js](https://nodejs.org/en/download/prebuilt-installer)
3. Run `npm install` to install dependencies
4. Execute tests with `npm test`

## Configuration

Logging can be configured via the `logs-config.env` file, allowing customization of:
- Log output mode
- Console color support

**Note:**
- The configuration in `logs-config.env` is automatically updated during GitHub Actions pipeline execution using repository variables. This means that while running tests through GitHub Actions, the configuration is fetched directly from the repository's settings, ensuring consistency across environments.
- When running tests locally, configuration is based on the local `.env` file or the default settings, giving flexibility for local development.

## GitHub Actions Pipelines

- This project includes two GitHub Actions workflow files to automate tasks:
Integration with GitHub Actions ensures consistent, efficient, and flexible workflows.
Automated pull request checks and manual test execution pipelines catch issues early,
streamline testing, and dynamically adapt configuration using repository variables.

### 1. **Pull Request (PR) Check Workflow**:

This workflow is triggered automatically when a pull request is created or updated for the `master` branch. It ensures that:
- The code builds correctly.
- Tests pass successfully before merging the PR into `master`.

If any tests fail or there are issues with the build, the PR cannot be merged into `master`.

**Key actions**:
- Runs the unit tests.
- Prevents the PR from being merged if tests fail.

You can view the status of the PR checks directly in the GitHub Actions tab of your repository. The status will indicate whether the workflow passed or failed.

### 2. **Manual Test Execution Workflow**:

This workflow allows you to manually trigger tests from any branch, not just during PRs. This can be useful if you want to run tests on a specific branch without creating a PR.

To trigger this workflow:
- Navigate to the **Actions** tab in your GitHub repository.
- Select the **Manual Test Execution Workflow**.
- Choose the branch you want to run tests against, and click **Run Workflow**.

This will trigger the tests for that branch, and you can monitor the progress and view the results directly in the GitHub Actions tab.

**Where to view the results**:
- All workflow logs, including the output of the tests, will be available in the **GitHub Actions tab** under your repository's **Actions** section.
- You can see the detailed output of each job and step, including console logs and any errors that occurred during the workflow.

## License

Private project for demonstration purposes.

## Author

Dumitru Condrea
