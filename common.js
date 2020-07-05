const fs = require('fs');
const path = require('path');
const glob = require('glob');
const fetch = require('node-fetch');

function forEachFile(filePath, callback) {
  const resolveFile = (file) => callback(path.resolve(file));

  if (filePath.includes('.md')) {
    if (fs.existsSync(filePath)) {
      resolveFile(filePath);
    } else {
      throw new Error('Markdown file not found by path');
    }
  } else {
    const files = glob.sync(`${filePath}**/*.md`);
    files.forEach(resolveFile);
  }
}

function findLinks(text, file) {
  const regx = /(\[.*\])(\(.*\))/gim;
  const links = text.match(regx);

  return links.map(link => {
    const groups = /\[(.*)\]\((.*)\)/gim;
    const [, text, href] = groups.exec(link);
    return { href, text, file };
  });
}

function extractLinksFromFile(filePath) {
  const textMD = fs.readFileSync(filePath).toString('utf-8');
  return findLinks(textMD, filePath);
}

function validateLink(link) {
  return fetch(link.href)
    .then(
      (res) => ({
        ...link,
        status: res.status,
      })
    )
    .catch(
      (error) => ({
        ...link,
        status: error.code === 'ENOTFOUND' ? 'DNS problem' : error.status,
      })
    );
}

exports.extractLinksFromFile = extractLinksFromFile;
exports.forEachFile = forEachFile;
exports.validateLink = validateLink;
