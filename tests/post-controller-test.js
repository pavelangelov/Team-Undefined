/* globals describe it beforeEach */
"use strict";
const chai = require("chai");
let expect = chai.expect;

const
    validUsername = "valid username",
    anonymousUser = { username: "anonymous" },
    data = {
        users: {
            getAnonymousUser() {
                return anonymousUser;
            },
            getUserByUsername(username) {
                if (username === validUsername) {
                    return Promise.resolve({ username: validUsername, friends: [], _id: 2 });
                } else {
                    return null;
                }
            }
        }
    },
    postController = require("../server/controllers/page-controllers/posts-controller")(data);

let params = [],
    mockUser = { username: "Ivan", friends: [], _id: 1 },
    reqFalse = {
        isAuthenticated() {
            return false;
        },
        params: { username: validUsername }
    },
    reqTrue = {
        isAuthenticated() {
            return true;
        },
        user: mockUser,
        params: { username: validUsername }
    },
    res = {
        redirect(url) {
            params.push(url);
        },
        render(url, obj) {
            params.push(url);
            params.push(obj);
        }
    };

describe("Test pageController.posts ", () => {
    beforeEach(() => {
        params = [];
    });

    it("Expect getCreatePost(req, res) to redirect to /unauthorized if no user", () => {
        let url = "/unauthorized";
        postController.getCreatePost(reqFalse, res);
        expect(params[0]).to.equal(url);
    });

    it("Expect getCreatePost(req, res) to redirect to users/create-post if have user", () => {
        let url = "users/create-post";
        postController.getCreatePost(reqTrue, res);
        expect(params[0]).to.equal(url);
        expect(params[1].user.username).to.equal(mockUser.username);
        expect(params[1].pageOwner.username).to.equal(validUsername);
    });
});