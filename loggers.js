const chalk = require('chalk');

function renderLogWithStats(links, logger) {
  const unique = new Set();
  const count = {
    broken: 0,
    valid: 0,
    total: 0,
  };

  links.forEach((link) => {
    const status = link.status === 200 ? 'valid' : 'broken';
    unique.add(link.href);
    count[status] += 1;
    count.total += 1;

    if (count.total != unique.size) {
      unique.delete(link.href);
    }
  })

  logger({ ...count, unique: unique.size });
}

function renderLog(links, logger) {
  links.forEach(logger);
}

function simpleLogger(link) {
  console.log(` - ${chalk.blue(link.text)} 👉 ${link.href} - ${link.file}`);
}

function validateLogger(link) {
  console.log(`${chalk[link.status < 400 ? 'green' : 'red'](link.status)} - ${chalk.blue(link.text)} 👉 ${link.href} - ${link.file}`);
}

function statsLogger(stats) {
  console.log(`Total: ${stats.total}\nUnique: ${stats.unique}`);
}

function statsWithValidateLogger(stats) {
  console.log(`Total: ${stats.total}\nUnique: ${stats.unique}\nBroken: ${stats.broken}\nOk:${stats.valid}`);
}

exports.renderLogWithStats = renderLogWithStats;
exports.renderLog = renderLog;
exports.statsLogger = statsLogger;
exports.simpleLogger = simpleLogger;
exports.validateLogger = validateLogger;
exports.statsWithValidateLogger = statsWithValidateLogger;
