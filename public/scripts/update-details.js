/* globals window $ validator alertify FormData document */

"use strict";

const waitTime = 1000;

$("#update-details-form").submit((ev) => {
    ev.preventDefault();
    let about = $("#about").val()
                            .trim(),
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
        processData: false,
        contentType: false,
        data: {
            firstname,
            lastname,
            about
        },
        success: () => {
            alertify.success("Information update successfully!");
            window.location = "/profile";
        },
        error: (err) => {
            alertify.error(err.message);
        }
    });
});