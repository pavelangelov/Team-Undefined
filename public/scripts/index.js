/* globals $ window validator CryptoJS alertify */

"use strict";

$("#login-form").submit((ev) => {
    ev.preventDefault();
    let username = $("#login-username").val(),
        password = $("#login-password").val();

    validator.validateCredentials(username, password)
        .then(credentials => {
            let hashPasword = CryptoJS.SHA256(credentials.password).toString();
            $.ajax({
                url: "/login",
                method: "POST",
                data: {
                    username: credentials.username,
                    password: hashPasword
                },
                success: (res) => {
                    window.location += res;
                },
                error: (err) => {
                    alertify.error(err.responseText);
                }
            });
        })
        .catch(err => alertify.error(err.message));
});

$("#register-form").submit((ev) => {
    ev.preventDefault();
    let username = $("#register-username").val(),
        password = $("#register-password").val(),
        firstname = $("#register-firstname").val(),
        lastname = $("#register-lastname").val();

    validator.validateCredentials(username, password)
        .then(credentials => {
            validator.validateName(firstname, "Firstname");
            validator.validateName(lastname, "Lastname");

            let hashPasword = CryptoJS.SHA256(credentials.password).toString();
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
                    alertify.error(err.responseText);
                }
            });
        })
        .catch(err => alertify.error(err.message));
});