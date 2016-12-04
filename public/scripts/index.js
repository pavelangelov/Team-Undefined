/* globals $ window validator CryptoJS alertify */

"use strict";

$("#login-form").submit((ev) => {
    ev.preventDefault();
    let username = $("#login-username").val()
                                        .trim(),
        password = $("#login-password").val()
                                        .trim();

    validator.validateCredentials(username, password)
        .then(() => {
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
                    alertify.error(err.responseText);
                }
            });
        })
        .catch(err => alertify.error(err.message));
});

$("#register-form").submit((ev) => {
    ev.preventDefault();
    let username = $("#register-username").val()
                                        .trim(),
        password = $("#register-password").val()
                                        .trim(),
        firstname = $("#register-firstname").val()
                                        .trim(),
        lastname = $("#register-lastname").val()
                                        .trim();

    validator.validateCredentials(username, password)
        .then(() => {
            validator.validateName(firstname, "Firstname");
            validator.validateName(lastname, "Lastname");

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
                success: () => {
                    alertify.success("User successfully registred!");
                    window.location = "";
                },
                error: (err) => {
                    alertify.error(err.responseText);
                }
            });
        })
        .catch(err => alertify.error(err.message));
});