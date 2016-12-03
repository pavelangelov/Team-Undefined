/* globals $ alertify */

"use strict";

$("button.like").on("click", (ev) => {
    let $this = $(ev.target),
        postId = $this.attr("data-id");

    $.ajax({
        url: `/posts/${postId}/increase-likes`,
        method: "PUT",
        data: { postId },
        success: (likes) => {
            $(`span[data-id=${postId}]`).html(likes);
            setTimeout(() => {
                $(`button.dislike[data-id="${postId}"]`).toggleClass("hidden");
                $this.toggleClass("hidden");
            }, 500);
        },
        error: (err) => {
            alertify.error(err.message);
        }
    });
});

$("button.dislike").on("click", (ev) => {
    let $this = $(ev.target),
        postId = $this.attr("data-id");

    $.ajax({
        url: `/posts/${postId}/decrease-likes`,
        method: "PUT",
        data: { postId },
        success: (likes) => {
            $(`span[data-id=${postId}]`).html(likes);
            setTimeout(() => {
                $(`button.like[data-id="${postId}"]`).toggleClass("hidden");
                $this.toggleClass("hidden");
            }, 500);
        },
        error: (err) => {
            alertify.error(err.message);
        }
    });
});