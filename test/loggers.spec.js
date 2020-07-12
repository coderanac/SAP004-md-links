const sinon = require('sinon');

const chalk = require('chalk');
const Chance = require('chance');
const chance = new Chance();

const { simpleLogger, validateLogger, statsLogger, statsWithValidateLogger, renderLog, renderLogWithStats } = require('../loggers');


describe(
  'loggers',

  () => {
    let spy;
    let spyObj;
    let link;
    let links;
    let stats;

    beforeEach(() => {
      spy = sinon.spy(console, 'log');
      spyObj = sinon.spy();

      link = {
        text: chance.word(),
        href: chance.url(),
        file: chance.word(),
        status: chance.natural({ min: 100, max: 500 }),
      };

      links = [
        {
          text: chance.word(),
          href: 'google.com',
          file: chance.word(),
          status: chance.natural({ min: 100, max: 200 }),
        },
        {
          text: chance.word(),
          href: 'google.com',
          file: chance.word(),
          status: chance.natural({ min: 100, max: 200 }),
        },
        {
          text: chance.word(),
          href: chance.url(),
          file: chance.word(),
          status: chance.natural({ min: 400, max: 500 }),
        },
      ];

      stats = {
        broken: chance.natural({ min: 1, max: 3 }),
        valid: chance.natural({ min: 1, max: 3 }),
        total: chance.natural({ min: 1, max: 3 }),
        unique: chance.natural({ min: 1, max: 3 }),
      }
    });

    afterEach(() => {
      sinon.restore();
    });

    it(
      'Should call the log when receiving an object',
      () => {
        const message = `- ${chalk.blue(link.text)} 👉 ${link.href} - ${link.file}`;

        simpleLogger(link);

        sinon.assert.calledOnce(spy);
        sinon.assert.calledWith(spy, message);
      }
    );

    it(
      'Should call the green log when receiving an object',
      () => {
        link.status = chance.natural({ min: 100, max: 399 });

        const message = `${chalk.green(link.status)} - ${chalk.blue(link.text)} 👉 ${link.href} - ${link.file}`;

        validateLogger(link);

        sinon.assert.calledOnce(spy);
        sinon.assert.calledWith(spy, message);
      }
    );

    it(
      'Should call the red log when receiving an object',
      () => {
        link.status = chance.natural({ min: 400, max: 500 });

        const message = `${chalk.red(link.status)} - ${chalk.blue(link.text)} 👉 ${link.href} - ${link.file}`;

        validateLogger(link);

        sinon.assert.calledOnce(spy);
        sinon.assert.calledWith(spy, message);
      }
    );

    it(
      'Should call the log with simple stats when receiving an object',
      () => {

        const message = `Total: ${stats.total}\nUnique: ${stats.unique}`;

        statsLogger(stats);

        sinon.assert.calledOnce(spy);
        sinon.assert.calledWith(spy, message);
      }
    );

    it(
      'Should call the log with all stats when receiving an object',
      () => {

        const message = `Total: ${stats.total}\nUnique: ${stats.unique}\nBroken: ${stats.broken}\nOk:${stats.valid}`;

        statsWithValidateLogger(stats);

        sinon.assert.calledOnce(spy);
        sinon.assert.calledWith(spy, message);
      }
    );

    it(
      'Should count corrects stats when receiving an array',
      () => {
        const callback = { broken: 1, valid: 2, total: 3, unique: 1 }

        renderLogWithStats(links, spyObj);

        sinon.assert.calledOnce(spyObj);
        sinon.assert.calledWith(spyObj, callback);
      }
    );

    it(
      'Should call corrects times loggers when receiving an array',
      () => {
        renderLog(links, spyObj);

        sinon.assert.callCount(spyObj, 3);
      }
    );

    it(
      'Should call 0 times loggers when receiving an empty array',
      () => {
        renderLog([], spyObj);

        sinon.assert.callCount(spyObj, 0);
      }
    );
  },
);
