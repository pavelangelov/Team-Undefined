/* globals $ window validator CryptoJS */

"use strict";

$("#login-form").submit((ev) => {
    ev.preventDefault();
    let username = $("#login-username").val(),
        password = $("#login-password").val();

    password = validator.validatePassword(password);
    username = validator.validateUsername(username);

    let hashPasword = CryptoJS.SHA256(password).toString();
    $.ajax({
        url: "/login",
        method: "POST",
        data: {
            username,
            password: hashPasword
        },
        success: (res) => {
            window.location += res;
        },
        error: (err) => {
            console.log("Error");
            console.log(err);
        }
    });
});

$("#register-form").submit((ev) => {
    ev.preventDefault();
    let username = $("#register-username").val(),
        password = $("#register-password").val(),
        firstname = $("#register-firstname").val(),
        lastname = $("#register-lastname").val();

    username = validator.validateUsername(username);
    password = validator.validatePassword(password);
    validator.validateName(firstname);
    validator.validateName(lastname);

    let hashPasword = CryptoJS.SHA256(password).toString();
    $.ajax({
        url: "/register",
        method: "POST",
        data: {
            username,
            password: hashPasword,
            firstname,
            lastname
        },
        success: (res) => {
            window.location += res;
        },
        error: (err) => {
            console.log("Error");
            console.log(err);
        }
    });
});