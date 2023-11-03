export interface Logger {
  debug(message?: any, ...optionalParams: any[]): void;
  info(message?: any, ...optionalParams: any[]): void;
  warn(message?: any, ...optionalParams: any[]): void;
  error(message?: any, ...optionalParams: any[]): void;
}

enum LogLevel {
  NONE,
  ERROR,
  WARN,
  INFO,
  DEBUG,
}

export type LoggerVerbosity = keyof typeof LogLevel;

class LoggerWrapper implements Logger {
  private readonly verbosity: number;
  constructor(
    private readonly logger: Logger,
    loggerVerbosity: LoggerVerbosity,
  ) {
    this.verbosity = LogLevel[loggerVerbosity];
  }

  debug(message?: any, ...optionalParams: any[]) {
    if (this.verbosity >= LogLevel.DEBUG) {
      this.logger.debug(message, ...optionalParams);
    }
  }

  info(message?: any, ...optionalParams: any[]) {
    if (this.verbosity >= LogLevel.INFO) {
      this.logger.info(message, ...optionalParams);
    }
  }

  warn(message?: any, ...optionalParams: any[]) {
    if (this.verbosity >= LogLevel.WARN) {
      this.logger.warn(message, ...optionalParams);
    }
  }

  error(message?: any, ...optionalParams: any[]) {
    if (this.verbosity >= LogLevel.ERROR) {
      this.logger.error(message, ...optionalParams);
    }
  }
}

let _logger: Logger;
export const initLogger = (
  logger: Logger,
  loggerVerbosity: LoggerVerbosity,
): void => {
  _logger = new LoggerWrapper(logger, loggerVerbosity);
};

export const getLogger = (): Logger => {
  if (!_logger) {
    initLogger(console, 'ERROR');
  }
  return _logger;
};
