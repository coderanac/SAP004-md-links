const sinon = require('sinon');

const main = require('../main');
const logger = require('../loggers');

describe(
  'cli',
  () => {
    let stubGetLinksValidateStats;
    let stubGetLinks;
    let stubRenderLogWithStats;
    let stubRenderLog;
    let random;

    beforeEach(() => {
      random = Date.now();

      stubGetLinksValidateStats = sinon
        .stub(main, 'getLinksWithValidation')
        .returns(
          Promise.resolve(random)
        );

      stubGetLinks = sinon.stub(main, 'getLinks')
        .returns('xpto');

      stubRenderLogWithStats = sinon.stub(logger, 'renderLogWithStats');

      stubRenderLog = sinon.stub(logger, 'renderLog');

    });

    afterEach(() => {
      sinon.restore();
      delete require.cache[require.resolve('../cli')];
    });

    it(
      'Should call getLinksWithValidation when received --validate',
      (done) => {
        process.argv = ['', '', './mocks/RAIZ3.md', '--validate'];

        require('../cli')
          .then(
            () => {
              sinon.assert.callCount(stubGetLinksValidateStats, 1);
              sinon.assert.calledWith(stubRenderLog, random);
            }
          )
          .then(done)
          .catch(done);
      }
    );

    it(
      'Should call getLinksWithValidation when received --validate --stats',
      (done) => {

        process.argv = ['', '', './mocks/RAIZ3.md', '--validate', '--stats'];
        require('../cli')
          .then(
            () => {
              sinon.assert.callCount(stubGetLinksValidateStats, 1);
              sinon.assert.calledWith(stubRenderLogWithStats, random);
            }
          )
          .then(done)
          .catch(done);
      }
    );

    it(
      'Should call getLinksWithValidation when received --validate --stats',
      () => {

        process.argv = ['', '', './mocks/RAIZ3.md', '--stats'];
        require('../cli');

        sinon.assert.callCount(stubRenderLogWithStats, 1);
        sinon.assert.calledWith(stubGetLinks, './mocks/RAIZ3.md');
      }
    );
    it(
      'Should call getLinksWithValidation when received',
      () => {

        process.argv = ['', '', './mocks/RAIZ3.md'];
        require('../cli');

        sinon.assert.callCount(stubRenderLog, 1);
        sinon.assert.calledWith(stubGetLinks, './mocks/RAIZ3.md');
      }
    );
  }
)
