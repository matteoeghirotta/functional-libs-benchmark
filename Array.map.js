const _ = require('lodash')
const R = require('ramda')
const RB = require('rambda')
const RBX = require('rambdax')
const sanctuary = require('sanctuary')
const benchmark = require('benchmark')

const S = sanctuary.create({
    checkTypes: true,
    env: sanctuary.env,
})

function double(n) {
    return n * 2
}

const data = [...Array(40)].map((_, idx) => idx)

const suite = new benchmark.Suite

// add tests
suite.add('native', () => {
    data.map(double)
})
    .add('ramda', () => {
        R.map(double, data);
    })
    .add('rambda', () => {
        RB.map(double, data);
    })
    .add('rambdax', () => {
        RBX.map(double, data);
    })
    .add('lodash', () => {
        _.map(data, double);
    })
    .add('sanctuary', () => {
        S.map(double)
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
