#!/usr/bin/env node

const { getLinks, getLinksWithValidation } = require('./main');
const { renderLog, simpleLogger, statsLogger, renderLogWithStats, statsWithValidateLogger, validateLogger } = require('./loggers');

function cli() {
  console.log('Processing file 🧶🐱');

  const path = process.argv[2];

  switch (true) {
    case process.argv.includes('--validate') && process.argv.includes('--stats'):
      return getLinksWithValidation(path).then((links) => renderLogWithStats(links, statsWithValidateLogger));
    case process.argv.includes('--validate'):
      return getLinksWithValidation(path).then((links) => renderLog(links, validateLogger));
    case process.argv.includes('--stats'):
      return renderLogWithStats(getLinks(path), statsLogger);
    default:
      return renderLog(getLinks(path), simpleLogger);
  }
}

module.exports = cli();
