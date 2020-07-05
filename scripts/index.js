const fetch = require('node-fetch');

exports.splitLinks = (links, path) => {
  const myLinks = [];

  links.forEach(link => {
    const groups = (/\[(.*)\]\((.*)\)/gim);
    link.replace(groups, '$1, $2');
    myLinks.push({
      href: RegExp.$2,
      text: RegExp.$1,
      file: path,
    });
  });

  return myLinks;
}

exports.matchLinks = (text) => {
  const regx = /(\[.*\])(\(.*\))/gim;
  return text.match(regx);
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
