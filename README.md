# 🧪 JavaScript Unit Testing Framework Example

## 📖 Overview

Welcome to **JS Unit Tests**, a comprehensive example project showcasing advanced techniques in unit testing with JavaScript. The project demonstrates:

- **Custom testing utilities** for arrays, strings, and other common data types.
- **Sophisticated logging system** with color-coded outputs and configurable levels.
- **Seamless integration with GitHub Actions** for CI/CD workflows.
- A structured, reusable framework for building and maintaining test suites in JavaScript projects.

---

## 🚀 Features

### 🔬 Core Testing Modules

- **Array Operations**:
  - Efficient manipulation with edge-case handling.
  - Advanced filtering and transformation methods.
  - Performance optimization for large datasets.
- **Utility Functions**:
  - Flexible date and time handling.
  - String processing and formatting.
  - Random data generation for robust test cases.

### 🛠️ Logging System

- **Output Modes**:
  - Console with customizable color schemes.
  - File-based logging for persistence.
  - Dual-mode for local and CI environments.
- **Key Features**:
  - Timestamped log entries.
  - Configurable verbosity levels.
  - Enhanced readability for debugging.

### 🧩 CI/CD Integration

- **GitHub Actions Workflows**:
  - Automated testing on pull requests.
  - Branch-specific triggers for manual test runs.
  - Continuous monitoring of test coverage and performance metrics.

---

## 📂 Project Structure

```plaintext
├── src/                    # Core implementation
│   ├── arrays-operations.js
│   ├── common/
│   │   ├── performable.js
│   │   └── validation.js
│   └── utils/
│       ├── date-time.js
│       ├── random-words.js
│       └── strings.js
├── test/                   # Test infrastructure
│   ├── test-suites/
│   ├── utils/
│   └── hook-defaults.js
├── config/                 # Configuration files
├── logging/                # Logging utilities
└── .github/                # CI/CD workflows
```

---

## 🛠️ Technologies Used

| Technology          | Purpose                              |
| ------------------- | ------------------------------------ |
|  **Node.js**        | Runtime environment                  |
|  **Mocha**          | Test framework                       |
|  **Chai**           | Assertion library                    |
| ✨ **Chalk**         | Console output styling               |
| 🔧 **Dotenv**       | Environment configuration management |
| 🎲 **Random-words** | Random data generation for testing   |

---

## 📝 Example Test Output

![Test Output Example](https://github.com/Dumitru-Condrea/JS-Unit-Tests/blob/images/images/test-output-example.png?raw=true)

------

## 📝 Example Test Cases

### Array Operations

```javascript
// Adding elements to the start of array
it('should add multiple values to the start of the array', function () {
  let valuesToAdd = generateUniqueRandomWordsAndNumbers(3);

  step('Populate default array with custom values.', () =>
          testTarget.addValuesToArray(valuesToAdd, 'start'));

  step('Validate that actual array contains expected values.', () =>
          expect(testTarget.array).to.include.members(valuesToAdd,
                  'Actual array doesnt contain expected values'));

  step('Validate that test values is added to the start of the array.', () =>
          expect(testTarget.getElementsByCountFromArray(valuesToAdd.length, 'start'))
                  .to.include.members(valuesToAdd, 'Added test values is not added to the start of array'));
});

// Filtering arrays
it('should return only numbers from the array', () =>
        step('Verify that extracted values is numbers', () =>
                testTarget.filterNumbers().forEach(item => {
                  expect(item).to.be.a('number')
                })));
```

---

## 🛠️ Getting Started

### Prerequisites

- Install [Node.js](https://nodejs.org/).

### Installation

```bash
  # Clone the repository
git clone https://github.com/your-repo/js-unit-tests.git
cd js-unit-tests

  # Install dependencies
npm install
```

### Running Tests

- Run all tests:
  ```bash
  npm test
  ```
- Run specific test suites:
  ```bash
  mocha test/test-suites/arrays
  ```

---

## ⚙️ Configuration

### Logging Configuration (`logs-config.env`)

```env
LOG_MODE=console          # Options: console, file, both
CONSOLE_COLORS=true       # Enable colorized logs
CONSOLE_GROUPING=false    # Disable grouping for CI logs
```

---

## 🧩 CI/CD Workflows

### GitHub Actions Test Output
![GitHub Test Output Example](https://github.com/Dumitru-Condrea/JS-Unit-Tests/blob/images/images/github-actions-output-example.png?raw=true)

### GitHub PR Check
![GitHub Test Output Example](https://github.com/Dumitru-Condrea/JS-Unit-Tests/blob/images/images/pr-check.png?raw=true)