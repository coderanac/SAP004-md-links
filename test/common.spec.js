const expect = require('chai').expect;
const nock = require('nock');
const sinon = require('sinon');

const Chance = require('chance');
const chance = new Chance;

const { validateLink, findLinks, extractLinksFromFile, forEachFile } = require('../common');


describe(
  'common',

  () => {

    describe(
      'validate link',
      () => {
        let link;

        beforeEach(() => {
          link = {
            href: chance.url() + '/',
          }

        });

        afterEach(() => {
          nock.cleanAll();
        })

        it(
          'Shoud bring valid status when receiving a href',
          (done) => {
            nock(link.href).get('/').reply(200);

            validateLink(link)
              .then(res => {
                expect(res).to.deep.equal({ href: link.href, status: 200 });
              })
              .then(done)
              .catch(done);
          }
        );

        it(
          'Shoud bring status code error when receiving a href',
          (done) => {
            nock(link.href).get('/').reply(400);

            validateLink(link)
              .then(res => {
                expect(res).to.deep.equal({ href: link.href, status: 400 });
              })
              .then(done)
              .catch(done);
          }
        );

        it(
          'Shoud bring invalid status when receiving a href',
          (done) => {
            nock(link.href).get('/').replyWithError({ code: 'ENOTFOUND' });

            validateLink(link)
              .then((res) => {
                expect(res).to.deep.equal({ href: link.href, status: 'DNS problem' });
              })
              .then(done)
              .catch(done);
          }
        );
      }
    );

    describe(
      'findlinks',
      () => {
        const file = 'absolute/path';

        it(
          'Should find the links when receiving an array',
          () => {
            const text = 'Aqui temos um [Link](https://link.com) para o teste';

            expect(findLinks(text, file)).to.deep.equal([{ href: 'https://link.com', text: 'Link', file: 'absolute/path' }]);
          }
        );

        it(
          'Should not find links when text no has link',
          () => {
            const text = 'aqui não tem nenhum link'

            expect(findLinks(text, file)).to.deep.equal([]);
          }
        );
      }
    );

    describe(
      'extractLinksFromFile',
      () => {
        const pathMock = './mocks/RAIZ3.md';

        it(
          'Should extract the links when receiving an path',
          () => {
            expect(extractLinksFromFile(pathMock)).to.deep.equal([{ href: 'https://github.com', text: 'RAIZ', file: './mocks/RAIZ3.md' }])
          }
        );
      }
    );


    describe(
      'extractLinksFromFile',
      () => {
        let spy;

        beforeEach(() => {
          spy = sinon.spy();
        });

        afterEach(() => {
          sinon.restore();
        });

        it(
          'Should extract the links when receiving an path',
          () => {
            const file = './mocks/RAIZ3.md';

            forEachFile(file, spy);

            sinon.assert.calledOnce(spy);
          }
        );

        it(
          'Should extract the links when receiving an path',
          () => {
            const folder = './mocks/';

            forEachFile(folder, spy);

            sinon.assert.callCount(spy, 5);
          }
        );

        it(
          'Should extract the links when receiving an path',
          () => {
            const notExist = 'not-path.md';
            const badFunction = () => { forEachFile(notExist) };

            expect(badFunction).to.throw();
          }
        );
      }
    );
  }
);
