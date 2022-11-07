import { getLogger, initLogger, Logger } from '../lib/logging';

const loggerMock = {
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

const callAllLevels = (logger: Logger): void => {
  logger.debug('test');
  logger.info('test');
  logger.warn('test');
  logger.error('test');
};

const expectCallLevels = (levels: number[]) => {
  const [debug, info, warn, error] = levels;
  expect(loggerMock.debug).toHaveBeenCalledTimes(debug);
  expect(loggerMock.info).toHaveBeenCalledTimes(info);
  expect(loggerMock.warn).toHaveBeenCalledTimes(warn);
  expect(loggerMock.error).toHaveBeenCalledTimes(error);
};

describe('it should call log only with appropiate level', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should never call logger when NONE', () => {
    initLogger(loggerMock, 'NONE');
    const logger = getLogger();
    callAllLevels(logger);
    expectCallLevels([0, 0, 0, 0]);
  });

  it('should only accept error when ERROR', () => {
    initLogger(loggerMock, 'ERROR');
    const logger = getLogger();
    callAllLevels(logger);
    expectCallLevels([0, 0, 0, 1]);
  });

  it('should accept error and warn when WARN', () => {
    initLogger(loggerMock, 'WARN');
    const logger = getLogger();
    callAllLevels(logger);
    expectCallLevels([0, 0, 1, 1]);
  });

  it('should accept error warn and info when INFO', () => {
    initLogger(loggerMock, 'INFO');
    const logger = getLogger();
    callAllLevels(logger);
    expectCallLevels([0, 1, 1, 1]);
  });

  it('should always call on DEBUG', () => {
    initLogger(loggerMock, 'DEBUG');
    const logger = getLogger();
    callAllLevels(logger);
    expectCallLevels([1, 1, 1, 1]);
  });
});
