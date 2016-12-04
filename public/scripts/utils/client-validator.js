"use strict";
const validator = (function () {
    const constants = {
        STRING_MIN_LENGTH: 1,
        STRING_MAX_LENGTH: 100,
        NAME_MIN_LENGTH: 2,
        NAME_MAX_LENGTH: 20,
        USERNAME_MIN_LENGTH: 4,
        USERNAME_MAX_LENGTH: 20,
        PASSWORD_MIN_LENGTH: 6,
        PASSWORD_MAX_LENGTH: 20,
        USERNAME_VALID_SYMBOLS: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
            "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
            "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "_", "-", "@"],
        PASWORD_VALID_SYMBOLS: ["<", ">", "(", ")", "{", "}", "_", "-"],
        BAD_SYMBOLS: ["<", ">", "\"", "'", "/", "(", ")", ".", "=", "@", "`", "{", "}"],
        ESCAPED_SYMBOLS: ["&lt;", "&gt;", "&quot;", "&#x27;", "&#x2F;", "&#40;", "&#41;", "&#46;", "&#61;", "&#64;", "&#96;", "&#123;", "&#125;"]
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
        value = value.trim();
        if (value.length < minLength || maxLength < value.length) {
            throw new Error(`${paramName} must be between ${minLength} and ${maxLength} symbols long!`);
        }
    }

    function validateUsernameForBadSymbols(username) {
        for (let i = 0, len = username.length; i < len; i += 1) {
            let char = username[i];
            if (!constants.USERNAME_VALID_SYMBOLS.some(c => c === char)) {
                throw new Error("Username contains invalid symbols!");
            }
        }
    }

    function validatePasswordForBadSymbols(password) {
        for (let i = 0, len = password.length; i < len; i += 1) {
            let char = password[i];
            if (!constants.USERNAME_VALID_SYMBOLS.some(c => c === char) &&
                !constants.PASWORD_VALID_SYMBOLS.some(c => c === char)) {
                throw new Error("Password contains invalid symbols!");
            }
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
        validateUsernameForBadSymbols(username);
    }

    function validatePassword(password) {
        validateStringLength(password, "Password", constants.PASSWORD_MIN_LENGTH, constants.PASSWORD_MAX_LENGTH);
        validatePasswordForBadSymbols(password);
    }

    return {
        validateCredentials(username, password) {
            return new Promise((resolve, reject) => {
                try {
                    validateUsername(username);
                    validatePassword(password);
                } catch (error) {
                    return reject(error);
                }

                return resolve();
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