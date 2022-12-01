import { configure, getLogger } from "log4js";
import { logConfiguration } from "./LoggerConfiguration";

import { QueryRunner } from "typeorm";

export interface ILogger {
  trace(message: any, ...args: any[]): void;
  debug(message: any, ...args: any[]): void;
  info(message: any, ...args: any[]): void;
  warn(message: any, ...args: any[]): void;
  error(message: any, ...args: any[]): void;
  fatal(message: any, ...args: any[]): void;
  logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner): any;
  logQueryError(
    error: string | Error,
    query: string,
    parameters?: any[],
    queryRunner?: QueryRunner
  ): any;
  logQuerySlow(
    time: number,
    query: string,
    parameters?: any[],
    queryRunner?: QueryRunner
  ): any;
  logSchemaBuild(message: string, queryRunner?: QueryRunner): any;
  logMigration(message: string, queryRunner?: QueryRunner): any;
  log(
    level: "log" | "info" | "warn",
    message: any,
    queryRunner?: QueryRunner
  ): any;
}

configure(logConfiguration);

let log4jsLogger = getLogger();

export const Log: ILogger = {
  trace: log4jsLogger.trace,
  debug: log4jsLogger.debug,
  info: log4jsLogger.info,
  warn: log4jsLogger.warn,
  error: log4jsLogger.error,
  fatal: log4jsLogger.fatal,
  logQuery: function (
    query: string,
    parameters?: any[],
    queryRunner?: QueryRunner
  ) {
    // don't log all queries
    // return;

    log4jsLogger.info(`${query}: ${parameters}`);
  },
  logQueryError: (
    error: string | Error,
    query: string,
    parameters?: any[],
    queryRunner?: QueryRunner
  ) => {
    log4jsLogger.error(`${error}`);
    log4jsLogger.error(`${query}: ${parameters}`);
  },
  logQuerySlow: (
    time: number,
    query: string,
    parameters?: any[],
    queryRunner?: QueryRunner
  ) => {
    log4jsLogger.info(`Slow Query: (${time}) -- ${query}: ${parameters}`);
  },
  logSchemaBuild: (message: string, queryRunner?: QueryRunner) => {
    log4jsLogger.info(`${message}`);
  },
  logMigration: (message: string, queryRunner?: QueryRunner) => {
    log4jsLogger.info(`${message}`);
  },
  log: (
    level: "log" | "info" | "warn",
    message: any,
    queryRunner?: QueryRunner
  ) => {
    if (level === "log") {
      log4jsLogger.info(`${message}`);
    } else if (level === "info") {
      log4jsLogger.info(`${message}`);
    } else {
      log4jsLogger.warn(`${message}`);
    }
  },
};
