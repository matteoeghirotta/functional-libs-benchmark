const { pipe, map, path, filter, head, mergeDeepLeft } = require("ramda");
const getAuthor = (id) => pipe( // create function to get an author
    path(["result", "authors"]), // gets authors arrays
    filter(item => item.id === id), // find an array of items with id
    head // picks the first one
)
const getJoin = (data) =>
    pipe(
        path(["result", "books"]), // get list of books
        map(item => // join items
            mergeDeepLeft(item, getAuthor(item.author)(data))
        )
    )(data)
getJoin(data)
