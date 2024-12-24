# 🧪 JavaScript Unit Testing Framework Example

## 📚 Overview
> Welcome to JS Unit Tests - a sophisticated testing framework that demonstrates the power and flexibility of modern JavaScript testing.
> This project showcases advanced testing techniques, smart logging, and test automation practices that you can use in your own projects.

## 🎯 Key Features

### 🔬 Core Testing Capabilities
- **Smart Array Operations Testing**
    - Comprehensive validation of array manipulations
    - Edge case handling
    - Performance testing for large datasets
    - Type safety verification

- **Utility Module Testing**
    - Date and time operations
    - String manipulations
    - Random data generation
    - Type conversions

### 📝 Advanced Logging System
- **Multi-mode Logging**
    - Console output with color highlighting
    - File-based logging for permanent records
    - Timestamp and context tracking

### 🎨 Developer Experience
- **Interactive Test Execution**
    - Real-time test progress visualization
    - Clear success/failure indicators
    - Detailed error reporting
    - Step-by-step test execution tracking

## 📁 Project Structure
```
  project/
 ├── 📂 src/                      # Core implementation
 │   ├── 📄 arrays-operations.js  # Main array operations
 │   ├── 📂 common/               # Shared utilities
 │   │   ├── 📄 performable.js    # Performable operations
 │   │   └── 📄 validation.js     # Validation operation
 │   └── 📂 utils/                # Helper functions
 ├── 📂 test/                     # Test infrastructure
 │   ├── 📂 test-suites/          # Organized test suites
 │   │   ├── 📂 arrays/           # Array operation tests
 │   │   ├── 📂 utils/            # Utility tests
 │   │   └── 📄 index.js          # Main test runner
 │   ├── 📂 utils/                # Helper functions for test and hooks
 │   └── 📄 hook-defaults.js      # Default hooks data and functions
 ├── 📂 config/                   # Framework configuration
 ├── 📂 logging/                  # Logging infrastructure          
 └── 📂 .github/                  # GitHub Actions pipelines yaml files
```

## 🛠️ Technology Stack

- ![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white) **Node.js**: Runtime environment
- ![Mocha](https://img.shields.io/badge/Mocha-8D6748?style=flat&logo=mocha&logoColor=white) **Mocha**: Test framework core
- ![Chai](https://img.shields.io/badge/Chai-A30701?style=flat&logo=chai&logoColor=white) **Chai**: Assertion library
- ✨ **Chalk**: Console styling
- 🎲 **Random-words**: Test data generation
- 🔧 **Dotenv**: Environment configuration

## 📝 Test Examples

### Array Operations
```javascript
// Adding elements to array
describe('Array Operations', () => {
  it('should add single value to array', () => {
    step('Add new value to array', () => {
      const value = generateUniqueRandomWordsAndNumbers(1);
      addValuesToArray(value);
      expect(array).to.include(value);
    });
  });

  it('handles edge cases', () => {
    step('Validate empty input', () => {
      expect(() => addValuesToArray(null))
        .to.throw('Provided values are null or empty.');
    });
  });
});

// Array filtering
describe('Array Filtering', () => {
  it('filters numbers correctly', () => {
    step('Filter positive numbers', () => {
      const result = filterPositiveNumbersFromArray();
      result.forEach(num => expect(num).to.be.above(0));
    });
  });
});
```

### Advanced Features
```javascript
// Step-by-step execution with logging
step('Processing array operation', () => {
  logWithTimestamp('Starting array manipulation');
  performActionsWithMessage(() => {
    // Your array operation
    addValuesToArray([1, 2, 3]);
  }, 'Adding multiple values');
  logWithTimestamp('Operation completed');
});
```

## 🚀 Getting Started

1. **Clone & Install**
   ```bash
   git clone https://github.com/Dumitru-Condrea/JS-Unit-Tests.git
   cd js-unit-tests
   npm install
   ```

2. **Run All Tests**
   ```bash
   npm test
   ```

3. **Run Specific Test Suite**
   ```bash
   # Run array tests only
   mocha test/test-suites/arrays
   ```
   ```bash
   # Run utility tests
   mocha test/test-suites/utils
   ```

## ⚙️ Framework Configuration

The framework is highly configurable through `logs-config.env`:

```env
# Logging Configuration
LOG_MODE=console      # console, file, or both
COLORS_ENABLED=true   # Enable/disable colored output
LOG_LEVEL=info        # debug, info, warn, error
```

## 🔄 CI/CD Integration

### GitHub Actions Workflows

1. 🔍 **Automated PR Validation**
    - Runs full test suite
    - Validates code style
    - Checks test coverage

2. 🚀 **Manual Test Execution**
    - On-demand test runs
    - Detailed reporting
    - Environment-specific testing
---

<div align="center">
  <sub>Built with ❤️ by Dumitru Condrea</sub>
</div>
