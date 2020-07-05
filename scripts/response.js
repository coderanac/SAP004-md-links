const md = require('../main');
const chalk = require('chalk');

exports.response = (validate) => {
  return md(process.argv[2], validate)
    .then(
      (res) => res
        .forEach(
          (link) => console.log(
            `${validate === true
              ? chalk[link.status === 200 ? 'green' : 'red'](link.status)
              : ''} - ${chalk.blue(link.text)} 👉 ${link.href} - ${link.file}`
          )
        )
    );
};

exports.responseStats = (validate) => {
  const links = new Set();
  let total = 0;
  let linksBroken = 0;
  let linksOk = 0;

  md(process.argv[2], validate)
    .then(
      (res) => {
        res.forEach(link => {
          total += 1;
          links.add(link.href);
          link.status === 200 ? linksOk += 1 : linksBroken += 1;

          if (total != links.size) {
            links.delete(link.href);
          }
        })
        const brokenOk = `\nBroken: ${linksBroken}\nOk:${linksOk}`;
        console.log(`Total: ${total}\nUnique: ${links.size}${validate === true ? brokenOk : ''}`)
      }
    );
};
