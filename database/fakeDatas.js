"use strict";

const users = [
    {
        _id: "aabbvvggddee",
        username: "pavel",
        password: "parola",
        firstname: "Pavel",
        lastname: "Angelov",
        image: "./images/ninja.jpg",
        friends: [
            {
                _id: "qqwweerrssaa",
                username: "pesho",
                image: "./images/pesho.jpg"
            },
            {
                _id: "mmddvvjjddww",
                username: "gosho",
                image: "./images/gosho.jpg"
            },
            {
                _id: "ppllkkddffgg",
                username: "tosho",
                image: "./images/tosho.jpg"
            },
            {
                _id: "wwrrmmnnbbff",
                username: "kiro",
                image: "./images/kiro.png"
            },
            {
                _id: "aawwqqeegghh",
                username: "marko",
                image: "./images/marko.png"
            },
            {
                _id: "ooiiuuyyttdd",
                username: "petko",
                image: "./images/petko.png"
            }
        ],
        messages: [
            {
                _id: "aawweeqqeeqq",
                author: "pesho",
                authorId: "qqwweerrssaa",
                image: "./images/pesho.jpg",
                postDate: new Date().toLocaleDateString(),
                content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat adipisci natus deserunt ducimus incidunt, velit molestias, obcaecati provident in distinctio quod iste harum beatae reiciendis vel nihil, minus vitae omnis!"
            },
            {
                _id: "aawweeqqeeqq",
                author: "gosho",
                authorId: "mmddvvjjddww",
                image: "./images/gosho.jpg",
                postDate: new Date().toLocaleDateString(),
                content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat adipisci natus deserunt ducimus incidunt, velit molestias, obcaecati provident in distinctio quod iste harum beatae reiciendis vel nihil, minus vitae omnis!"
            },
            {
                _id: "aawweeqqeeqq",
                author: "tosho",
                authorId: "ppllkkddffgg",
                image: "./images/tosho.jpg",
                postDate: new Date().toLocaleDateString(),
                content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat adipisci natus deserunt ducimus incidunt, velit molestias, obcaecati provident in distinctio quod iste harum beatae reiciendis vel nihil, minus vitae omnis!"
            },
            {
                _id: "aawweeqqeeqq",
                author: "kiro",
                authorId: "wwrrmmnnbbff",
                image: "./images/kiro.png",
                postDate: new Date().toLocaleDateString(),
                content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat adipisci natus deserunt ducimus incidunt, velit molestias, obcaecati provident in distinctio quod iste harum beatae reiciendis vel nihil, minus vitae omnis!"
            },
            {
                _id: "aawweeqqeeqq",
                author: "marko",
                authorId: "aawwqqeegghh",
                image: "./images/marko.png",
                postDate: new Date().toLocaleDateString(),
                content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat adipisci natus deserunt ducimus incidunt, velit molestias, obcaecati provident in distinctio quod iste harum beatae reiciendis vel nihil, minus vitae omnis!"
            },
            {
                _id: "aawweeqqeeqq",
                author: "petko",
                authorId: "ooiiuuyyttdd",
                image: "./images/petko.png",
                postDate: new Date().toLocaleDateString(),
                content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat adipisci natus deserunt ducimus incidunt, velit molestias, obcaecati provident in distinctio quod iste harum beatae reiciendis vel nihil, minus vitae omnis!"
            }
        ]
    }
];

const messages = [

];

module.exports = {
    users,
    messages
};