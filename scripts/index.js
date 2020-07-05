const fetch = require('node-fetch');

exports.findLinks = (text, file) => {
  const regx = /(\[.*\])(\(.*\))/gim;
  const links = text.match(regx);

  return links.map(link => {
    const groups = /\[(.*)\]\((.*)\)/gim;
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
