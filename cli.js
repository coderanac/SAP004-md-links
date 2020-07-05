#!/usr/bin/env node

const { getLinks, getLinksWithValidation } = require('./main');
const { renderLog, simpleLogger, statsLogger, renderLogWithStats, statsWithValidateLogger, validateLogger } = require('./loggers');

console.log('Processing file 🧶🐱');

const path = process.argv[2];

switch (true) {
  case process.argv.includes('--validate') && process.argv.includes('--stats'):
    getLinksWithValidation(path).then((links) => renderLogWithStats(links, statsWithValidateLogger));
    break;
  case process.argv.includes('--validate'):
    getLinksWithValidation(path).then((links) => renderLog(links, validateLogger));
    break;
  case process.argv.includes('--stats'):
    renderLogWithStats(getLinks(path), statsLogger);
    break;
  default:
    renderLog(getLinks(path), simpleLogger);
    break;
}
