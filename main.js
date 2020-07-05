const path = require('path');
const fs = require('fs');
const glob = require('glob');

const { splitLinks, matchLinks, validateLink } = require('./scripts/index');


function markdownLinks(archivePath, validate) {
  const files = archivePath.includes('.md') ? [archivePath] : glob.sync(`${archivePath}**/*.md`);
  const requests = [];

  files.forEach(file => {
    const pathAbsolute = path.resolve(file);

    if (fs.existsSync(pathAbsolute)) {
      const textMD = fs.readFileSync(pathAbsolute).toString('utf-8');
      const linksMD = matchLinks(textMD);
      const formatedLinks = splitLinks(linksMD, pathAbsolute);

      requests.push(...(
        validate === true
          ? validateLink(formatedLinks)
          : formatedLinks.map(link => Promise.resolve(link))
      ));
    } else {
      throw new Error('Markdown file not found by path');
    }
  });

  return Promise.all(requests).then((links) => links);
}

module.exports = markdownLinks;
