/* globals describe it beforeEach */
"use strict";

const chai = require("chai"),
    validUsername = "valid username",
    invalidUsername = "invalid username",
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
    usersController = require("../server/controllers/page-controllers/users-controller")(data);

let expect = chai.expect;
let params = [],
    mockUser = { username: "Pesho", friends: [], _id: 1 },
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

describe("Test pageController.users ", () => {
    beforeEach(() => {
        params = [];
    });

    it("Expect profile(req, res) to redirect to /unauthorized if no user", () => {
        let url = "/unauthorized";
        usersController.profile(reqFalse, res);
        expect(params[0]).to.equal(url);
    });

    it("Expect profile(req, res) to render user-profile if have user", () => {
        let url = "user-profile";
        usersController.profile(reqTrue, res);
        expect(params[0]).to.equal(url);
        expect(params[1].user.username).to.equal(mockUser.username);
    });

    it("Expect userProfile(req, res) to get anonymous user from DB and render users/users-profile when no user in request.", done => {
        let url = "users/users-profile";

        usersController.userProfile(reqFalse, res);
        setTimeout(() => {
            expect(params[0]).to.equal(url);
            expect(params[1].user.username).to.equal(anonymousUser.username);
            expect(params[1].pageOwner.username).to.equal(validUsername);
            done();
        }, 500);
    });

    it("Expect userProfile(req, res) to get user by username from DB and render users/users-profile when have user in request.", done => {
        let url = "users/users-profile";

        usersController.userProfile(reqTrue, res);
        setTimeout(() => {
            expect(params[0]).to.equal(url);
            expect(params[1].user.username).to.equal(mockUser.username);
            expect(params[1].pageOwner.username).to.equal(validUsername);
            done();
        }, 100);
    });
});