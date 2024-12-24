/**
 * ValidationCenter - Centralized validation and error handling system.
 * Provides reusable validation methods and fluent interface for chaining validations.
 */
export class Validation {
    constructor(value) {
        this.value = value;
        this.errors = [];
    }

    /**
     * Static method to create an instance and initialize the value to be validated.
     *
     * @param {*} [value] - The value to validate.
     * @returns {Validation} An instance of ValidationCenter.
     */
    static startsFor(value) {
        return new Validation(value);
    }

    /**
     * Adds a validation check to the current instance.
     *
     * @param {boolean} condition - The condition to evaluate.
     * @param {string} message - The error message if the condition fails.
     * @returns {Validation} The current ValidationCenter instance for chaining.
     */
    check(condition, message) {
        if (!condition) {
            this.errors.push(new Error(message));
        }
        return this;
    }

    /**
     * Validates all checks and throws the first error if any validation fails.
     *
     * @throws {Error} Throws the first validation error if any.
     */
    validate() {
        if (this.errors.length > 0) {
            throw this.errors[0];
        }
    }

    /**
     * Checks if the value is null, undefined, or empty (for both single values and arrays).
     *
     * @param {string} message - The error message if the value is null, undefined, or empty.
     * @returns {Validation} The current instance for chaining.
     */
    checkNullOrEmpty(message = 'Value is null, undefined, or empty.') {
        return this.check(
            this.value != null && (!(Array.isArray(this.value) && this.value.length === 0)
                && (!(typeof this.value === 'string') || this.value.trim().length > 0)),
            message
        );
    }

    /**
     * Validates that the value is a number.
     *
     * @param {string} message - The error message if the value is not a valid number.
     * @returns {Validation} The current instance for chaining.
     */
    checkNumber(message = 'Provided value is not a valid number.') {
        return this.check(typeof this.value === 'number', message);
    }

    /**
     * Validates that the value is a string.
     *
     * @param {string} message - The error message if the value is not a valid string.
     * @returns {Validation} The current instance for chaining.
     */
    checkString(message = 'Provided value is not a valid string.') {
        return this.check(typeof this.value === 'string', message);
    }

    /**
     * Validates that the value is an array.
     *
     * @param {string} message - The error message if the value is not a valid array.
     * @returns {Validation} The current instance for chaining.
     */
    checkArray(message = 'Provided value is not a valid array.') {
        return this.check(Array.isArray(this.value), message);
    }

    /**
     * Checks if the value is a positive number.
     *
     * @param {string} message - The error message if the value is not a positive number.
     * @returns {Validation} The current instance for chaining.
     */
    checkPositiveNumber(message = 'Provided value is not a positive number.') {
        return this.check(this.value > 0, message);
    }

    /**
     * Checks if the value is a function.
     *
     * @param {string} message - The error message if the value is not a valid function.
     * @returns {Validation} The current instance for chaining.
     */
    checkFunction(message = 'Provided value is not a valid function.') {
        return this.check(this.value === 'function' || typeof this.value === 'function', message);
    }
}