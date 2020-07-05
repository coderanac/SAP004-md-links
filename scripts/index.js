const fetch = require('node-fetch');

exports.findLinks = (text, file) => {
  const groups = (/\[(.*)\]\((.*)\)/gim);
  const regx = /(\[.*\])(\(.*\))/gim;
  const links = text.match(regx);

  return links.map(link => {
    const [,text, href] = groups.exec(link);
    return { href, text, file };
  });
}

exports.validateLink = (listLinks) => {
  return listLinks.map((link) =>
    fetch(link.href)
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
      )
  );
}
