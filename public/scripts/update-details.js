/* globals window $ validator alertify */

"use strict";

const waitTime = 1000;

$("#update-details-form").submit((ev) => {
    ev.preventDefault();
    let about = $("#about").val()
                            .trim(),
        file = $("#file").val(),
        firstname = $("#firstname").val()
                                    .trim(),
        lastname = $("#lastname").val()
                                    .trim();
    try {
        validator.validateName(firstname, "Firstname");
        validator.validateName(lastname, "Lastname");
    } catch (error) {
        alertify.error(error.message);
        return;
    }

    $.ajax({
        url: "/update-details",
        method: "POST",
        data: {
            firstname,
            lastname,
            file,
            about
        },
        success: () => {
            alertify.success("Information update successfully!");
            setTimeout(() => {
                window.location = "/profile";
            }, waitTime);
        },
        error: (err) => {
            alertify.error(err.message);
        }
    });
});