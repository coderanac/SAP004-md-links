const { extractLinksFromFile, forEachFile, validateLink } = require('./common');

function getLinks(filePath) {
  const links = [];

  forEachFile(filePath, (file) => {
    links.push(...extractLinksFromFile(file));
  });

  return links;
}

function getLinksWithValidation(filePath) {
  const links = getLinks(filePath);

  const requests = links.map(validateLink);

  return Promise.all(requests);
}

exports.getLinks = getLinks;
exports.getLinksWithValidation = getLinksWithValidation;
