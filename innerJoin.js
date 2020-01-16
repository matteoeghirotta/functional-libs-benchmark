const R = require('ramda')
const RB = require('rambda')
const testcheck = require('testcheck')

// const { pipe, map, path, filter, head, mergeDeepLeft } = require("ramda");
const benchmark = require('benchmark')

// ...new Array(10).keys()

const generateData = function* gen(n) {
    let authors = []
    let _ = [...Array(n)].forEach(_ => {
	let author = yield testcheck.gen.int
	authors.push(author)
    })
}

// return authors
// }


const data = {
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

const getAuthor = (lib, id) => lib.pipe( // create function to get an author
    lib.path(["result", "authors"]),     // gets authors arrays
    lib.filter(item => item.id === id),  // find an array of items with id
    lib.head // picks the first one
)

const getJoin = (lib, data) => {
    lib.pipe(
        lib.path(["result", "books"]), // get list of books
        lib.map(item => // join items
            lib.mergeDeepLeft(item, getAuthor(item.author)(data))
        ))(data)
}

const suite = new benchmark.Suite

suite.add('ramda', () => {
    getJoin(R, data)
})
    .add('rambda', () => {
        getJoin(RB, data)
    })
    // add listeners
    .on('cycle', (event) => {
        console.log(String(event.target))
    })
    .on('complete', function() {
        console.log('Fastest is ' + this.filter('fastest').map('name'))
    })
    // run async
    .run({ 'async': true })
