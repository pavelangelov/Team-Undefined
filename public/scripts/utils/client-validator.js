"use strict";
const validator = (function() {
    const constants = {
        STRING_MIN_LENGTH: 1,
        STRING_MAX_LENGTH: 100,
        NAME_MIN_LENGTH: 2,
        NAME_MAX_LENGTH: 20,
        USERNAME_MIN_LENGTH: 4,
        USERNAME_MAX_LENGTH: 20,
        PASSWORD_MIN_LENGTH: 6,
        PASSWORD_MAX_LENGTH: 20,
        BAD_SYMBOLS: ["&", "<", ">", "\"", "'", "/", "(", ")", ".", "#", "=", "@", "`", "{", "}"],
        ESCAPED_SYMBOLS: ["&amp;", "&lt;", "&gt;", "&quot;", "&#x27;", "&#x2F;", "&#40;", "&#41;", "&#46;", "&#35;", "&#61;", "&#64;", "&#96;", "&#123;", "&#125;"]
    };

    function validateIfUdefined(value, paramName) {
        if (value === undefined) {
            throw new Error(`${paramName} cannot be undefined!`);
        }
    }

    function validateStringLength(value, paramName, minLength, maxLength) {
        paramName = paramName || "Value";
        minLength = minLength || constants.STRING_MIN_LENGTH;
        maxLength = maxLength || constants.STRING_MAX_LENGTH;

        validateIfUdefined(value, paramName);

        if (value.length < minLength || maxLength < value.length) {
            throw new Error(`${paramName} must be between ${minLength} and ${maxLength} symbols long!`);
        }
    }

    function replaceBadChar(char) {
        constants.BAD_SYMBOLS.forEach((symbol, index) => {
            if (char === symbol) {
                char = constants.ESCAPED_SYMBOLS[index];
            }
        });

        return char;
    }

    function replaceBadSymbols(value) {
        let len = value.length,
            step = 1,
            escapedValue = "";

        for (let i = 0; i < len; i += step) {
            escapedValue += replaceBadChar(value[i]);
        }

        return escapedValue;
    }

    function validateUsername(username) {
        validateStringLength(username, "Username", constants.USERNAME_MIN_LENGTH, constants.USERNAME_MAX_LENGTH);

        let escapedUsername = replaceBadSymbols(username);

        return escapedUsername;
    }

    function validatePassword(password) {
        validateStringLength(password, "Password", constants.PASSWORD_MIN_LENGTH, constants.PASSWORD_MAX_LENGTH);

        let escapedPassword = replaceBadSymbols(password);

        return escapedPassword;
    }

    return {
        validateCredentials(username, password) {
            return new Promise((resolve, reject) => {
                try {
                    username = validateUsername(username);
                    password = validatePassword(password);
                } catch (error) {
                    return reject(error);
                }

                return resolve({ username, password });
            });
        },
        replaceBadSymbols(value) {
            let escapedValue = replaceBadSymbols(value);

            return escapedValue;
        },
        validateName(name, paramName) {
            validateStringLength(name, paramName, constants.NAME_MIN_LENGTH, constants.NAME_MAX_LENGTH);
        }
    };
} ());