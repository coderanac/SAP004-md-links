const { expect } = require('chai');

const { matchLinks, splitLinks, validateLink } = require('../index');

const text = `
  [To Link](http://link.info)borderNoEntry
  [My Link]        noEntry      (link.info)
  [My Linklink.info)
  [To link [Lab]](link.com)

`;

const arr = ['[To Link](http://link.info)'];

const path = 'path';

const list = [
  {
    'file': 'File',
    'href': 'No link',
    'text': 'To Link'
  },
  {
    'file': 'File',
    'href': 'http://google.com',
    'text': 'To Link'
  }
];

describe(
  'Extract links markdown of text',
  () => {
    it(
      'Filter links markdown',
      () => {
        expect(matchLinks(text)).to.deep.equal([
          '[To Link](http://link.info)',
          '[To link [Lab]](link.com)'
        ]);
      }
    )
  }
);

describe(
  'Split value into two groups',
  () => {
    it(
      'Split to index of array',
      () => {
        expect(splitLinks(arr, path)).to.deep.equal([
          {
            'href': 'http://link.info',
            'text': 'To Link',
            'file': path,
          }
        ]);
      }
    )
  }
);


