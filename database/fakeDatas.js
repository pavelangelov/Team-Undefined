"use strict";

const users = [
    {
        _id: "aabbvvggddee",
        username: "pavel",
        password: "parola",
        firstname: "Pavel",
        lastname: "Angelov",
        image: "/static/images/ninja.jpg",
        friends: [
            {
                _id: "qqwweerrssaa",
                username: "pesho",
                image: "/static/images/pesho.jpg"
            },
            {
                _id: "mmddvvjjddww",
                username: "gosho",
                image: "/static/images/gosho.jpg"
            },
            {
                _id: "ppllkkddffgg",
                username: "tosho",
                image: "/static/images/tosho.jpg"
            },
            {
                _id: "wwrrmmnnbbff",
                username: "kiro",
                image: "/static/images/kiro.png"
            },
            {
                _id: "aawwqqeegghh",
                username: "marko",
                image: "/static/images/marko.png"
            },
            {
                _id: "ooiiuuyyttdd",
                username: "petko",
                image: "/static/images/petko.png"
            }
        ],
        messages: [
            {
                _id: "aawweeqqeeqq",
                author: "pesho",
                authorId: "qqwweerrssaa",
                image: "/static/images/pesho.jpg",
                postDate: new Date().toLocaleDateString(),
                content: "Whatzuup bro!"
            },
            {
                _id: "aawweeqqeeqq",
                author: "gosho",
                authorId: "mmddvvjjddww",
                image: "/static/images/gosho.jpg",
                postDate: new Date().toLocaleDateString(),
                content: "Kyde se gubish mladej :)"
            },
            {
                _id: "aawweeqqeeqq",
                author: "tosho",
                authorId: "ppllkkddffgg",
                image: "/static/images/tosho.jpg",
                postDate: new Date().toLocaleDateString(),
                content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat adipisci natus deserunt ducimus incidunt, velit molestias, obcaecati provident in distinctio quod iste harum beatae reiciendis vel nihil, minus vitae omnis!"
            },
            {
                _id: "aawweeqqeeqq",
                author: "kiro",
                authorId: "wwrrmmnnbbff",
                image: "/static/images/kiro.png",
                postDate: new Date().toLocaleDateString(),
                content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat adipisci natus deserunt ducimus incidunt, velit molestias, obcaecati provident in distinctio quod iste harum beatae reiciendis vel nihil, minus vitae omnis!"
            },
            {
                _id: "aawweeqqeeqq",
                author: "marko",
                authorId: "aawwqqeegghh",
                image: "/static/images/marko.png",
                postDate: new Date().toLocaleDateString(),
                content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat adipisci natus deserunt ducimus incidunt, velit molestias, obcaecati provident in distinctio quod iste harum beatae reiciendis vel nihil, minus vitae omnis!"
            },
            {
                _id: "aawweeqqeeqq",
                author: "petko",
                authorId: "ooiiuuyyttdd",
                image: "/static/images/petko.png",
                postDate: new Date().toLocaleDateString(),
                content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat adipisci natus deserunt ducimus incidunt, velit molestias, obcaecati provident in distinctio quod iste harum beatae reiciendis vel nihil, minus vitae omnis!"
            }
        ]
    }
];

const posts = [
    {
        _id: "aawweeqqeeqq",
        author: "pesho",
        authorId: "qqwweerrssaa",
        targetUserId: "aabbvvggddee",
        image: "/static/images/pesho.jpg",
        postDate: new Date().toLocaleDateString(),
        likes: 0,
        content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat adipisci natus deserunt ducimus incidunt, velit molestias, obcaecati provident in distinctio quod iste harum beatae reiciendis vel nihil, minus vitae omnis!"
    },
    {
        _id: "aawweeqqeeqq",
        author: "gosho",
        authorId: "mmddvvjjddww",
        targetUserId: "aabbvvggddee",
        image: "/static/images/gosho.jpg",
        postDate: new Date().toLocaleDateString(),
        likes: 2,
        content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat adipisci natus deserunt ducimus incidunt, velit molestias, obcaecati provident in distinctio quod iste harum beatae reiciendis vel nihil, minus vitae omnis!"
    },
    {
        _id: "aawweeqqeeqq",
        author: "tosho",
        authorId: "ppllkkddffgg",
        targetUserId: "aabbvvggddee",
        image: "/static/images/tosho.jpg",
        postDate: new Date().toLocaleDateString(),
        likes: 10,
        content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat adipisci natus deserunt ducimus incidunt, velit molestias, obcaecati provident in distinctio quod iste harum beatae reiciendis vel nihil, minus vitae omnis!"
    },
    {
        _id: "aawweeqqeeqq",
        author: "kiro",
        authorId: "wwrrmmnnbbff",
        targetUserId: "aabbvvggddee",
        image: "/static/images/kiro.png",
        postDate: new Date().toLocaleDateString(),
        likes: 0,
        content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat adipisci natus deserunt ducimus incidunt, velit molestias, obcaecati provident in distinctio quod iste harum beatae reiciendis vel nihil, minus vitae omnis!"
    },
    {
        _id: "aawweeqqeeqq",
        author: "marko",
        authorId: "aawwqqeegghh",
        targetUserId: "aabbvvggddee",
        image: "/static/images/marko.png",
        postDate: new Date().toLocaleDateString(),
        likes: 4,
        content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat adipisci natus deserunt ducimus incidunt, velit molestias, obcaecati provident in distinctio quod iste harum beatae reiciendis vel nihil, minus vitae omnis!"
    },
    {
        _id: "aawweeqqeeqq",
        author: "petko",
        authorId: "ooiiuuyyttdd",
        targetUserId: "aabbvvggddee",
        image: "/static/images/petko.png",
        postDate: new Date().toLocaleDateString(),
        likes: 8,
        content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat adipisci natus deserunt ducimus incidunt, velit molestias, obcaecati provident in distinctio quod iste harum beatae reiciendis vel nihil, minus vitae omnis!"
    }
];

module.exports = {
    users,
    posts
};