const _ = require('lodash')
const R = require('ramda')
const RB = require('rambda')
const RBX = require('rambdax')
const Cmap = require('crocks/pointfree/map')
const sanctuary3 = require('sanctuary3')
const sanctuary = require('sanctuary')
const benchmark = require('benchmark')

const S = sanctuary.create({
  checkTypes: true,
  env: sanctuary.env
})

const SNT = sanctuary.create({
  checkTypes: false,
  env: sanctuary.env
})

const SU = sanctuary.unchecked

const S3 = sanctuary3.create({
  checkTypes: true,
  env: sanctuary3.env
})

const SNT3 = sanctuary3.create({
  checkTypes: false,
  env: sanctuary3.env
})

const SU3 = sanctuary3.unchecked

function double(n) {
  return n * 2
}

const data = [...Array(40)].map((_, idx) => idx)

const suite = new benchmark.Suite()

suite
  .add('crocks', () => {
    Cmap(double, data)
  })
  .add('native', () => {
    data.map(double)
  })
  .add('ramda', () => {
    R.map(double, data)
  })
  .add('rambda', () => {
    RB.map(double, data)
  })
  .add('rambdax', () => {
    RBX.map(double, data)
  })
  .add('lodash', () => {
    _.map(data, double)
  })
  .add('sanctuary', () => {
    S.map(double)
  })
  .add('sanctuary wo type checking', () => {
    SNT.map(double)
  })
  .add('sanctuary unchecked', () => {
    SU.map(double)
  })
  .add('sanctuary3', () => {
    S3.map(double)
  })
  .add('sanctuary3 wo type checking', () => {
    SNT3.map(double)
  })
  .add('sanctuary3 unchecked', () => {
    SU3.map(double)
  })
  // add listeners
  .on('cycle', event => {
    console.log(String(event.target))
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  })
  // run async
  .run({ async: true })
