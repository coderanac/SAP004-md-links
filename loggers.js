const chalk = require('chalk');

function renderLogWithStats(links, logger) {
  const unique = new Set();
  const count = {
    broken: 0,
    valid: 0,
    total: 0,
  };

  links.forEach((link) => {
    const status = link.status < 400 ? 'valid' : 'broken';
    count[status] += 1;
    count.total += 1;

    if (unique.has(link.href)) {
      unique.delete(link.href);
    } else {
      unique.add(link.href);
    }
  });

  logger({ ...count, unique: unique.size });
}

function renderLog(links, logger) {
  links.length > 0 ? links.forEach(logger) : console.log('no has link');
}

function simpleLogger(link) {
  console.log(`- ${chalk.blue(link.text)} 👉 ${link.href} - ${link.file}`);
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
