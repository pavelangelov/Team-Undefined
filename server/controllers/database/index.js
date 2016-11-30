"use strict";

const teamMembers = [
    {
        name: "Pavel Angelov",
        image: "https://telerikacademy.com/Content/Avatars/936/37936_083e8ae3_180x180.jpg",
        telerikAccount: "https://telerikacademy.com/Users/p_a_v_el",
        githubAccount: "https://github.com/pavelangelov"
    },
    {
        name: "Ivaylo Paskalev",
        image: "https://telerikacademy.com/Content/Avatars/171/26171_0dd8fa73_180x180.jpg",
        telerikAccount: "https://telerikacademy.com/Users/IvayloPaskalev",
        githubAccount: "https://github.com/IvayloPaskalev"
    },
    {
        name: "Emil Ruzhenov",
        image: "https://telerikacademy.com/Content/Avatars/950/34950_3dcadc58_180x180.jpg",
        telerikAccount: "https://telerikacademy.com/Users/emo_r",
        githubAccount: "https://github.com/emilrr"
    },
    {
        name: "Veselin Krastev",
        image: "https://telerikacademy.com/Content/Avatars/908/33908_ea8f69d8_180x180.jpg",
        telerikAccount: "https://telerikacademy.com/Users/Veselin93",
        githubAccount: "https://github.com/Vekoks"
    },
    {
        name: "Venelin Petkov",
        image: "https://telerikacademy.com/Content/Avatars/045/18045_721539aa_180x180.jpg",
        telerikAccount: "https://telerikacademy.com/Users/venelingp",
        githubAccount: "https://github.com/VenelinGP"
    }
];

const users = require("./users-db-controller"),
    posts = require("./posts-db-controller");

module.exports = {
    users,
    posts,
    team: teamMembers
};