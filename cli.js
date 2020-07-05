#!/usr/bin/env node

const { response, responseStats } = require('./scripts/response');

console.log('Processing file 🧶🐱');

switch (true) {
  case process.argv.includes('--validate') && process.argv.includes('--stats'):
    responseStats(true);
    break;
  case process.argv.includes('--validate'):
    response(true);
    break;
  case process.argv.includes('--stats'):
    responseStats(false);
    break;
  default:
    response(false);
    break;
}
