const expect = require('chai').expect;

const { getLinks, getLinksWithValidation } = require('../main');

describe(
  'main',

  () => {
    it(
      'Should bring an array of objects when given a path',
      () => {
        const file = './mocks/RAIZ3.md';

        expect(getLinks(file)).to.deep.equal([{ href: 'https://github.com', text: 'RAIZ', file: '/home/marcos/git/SAP004-md-links/mocks/RAIZ3.md' }]);
      }
    );

    it(
      'Should bring an array of objects when given a path',
      () => {
        const file = './mocks/RAIZ3.md';

        getLinksWithValidation(file).then(
          res => expect(res).to.deep.equal([
            {
              href: 'https://github.com',
            text: 'RAIZ',
            file: '/home/marcos/git/SAP004-md-links/mocks/RAIZ3.md',
            status: 200
          }
          ])
        );
      }
    );
  }
);
