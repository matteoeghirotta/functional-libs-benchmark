const { pipe, map, path } = require("ramda"); // import functions

var data = {
    "result": {
        "authors": [
            { "id": 101, "authorName": "Alice", "phoneNumber": "555-1234" },
            { "id": 124, "authorName": "John", "phoneNumber": "893-4564" }
        ],
        "books": [
            { "id": 434, "title": "Divergent", "author": 124 },
            { "id": 435, "title": "The Giver", "author": 124 },
            { "id": 434, "title": "The Maze Runner", "author": 101 }
        ]
    }
}

const pickAuthorNames = pipe(
    path(["result", "authors"]),
    map(item => item.authorName)
);
pickAuthorName(data); // this will return ["Alice" , "John"]
