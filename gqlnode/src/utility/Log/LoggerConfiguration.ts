import { Configuration } from "log4js";

const logLevel = "INFO";

export const logConfiguration: Configuration = {
  appenders: {
    app: {
      type: "dateFile",
      filename: "log/app.log",
      keepFileExt: true,
      alwaysIncludePattern: false,
      fileNameSep: ".",
      pattern: "yyyy-MM-dd",
      numBackups: 1,
    },
    errorFile: {
      type: "dateFile",
      filename: "log/errors.log",
      keepFileExt: true,
      alwaysIncludePattern: false,
      fileNameSep: ".",
      pattern: "yyyy-MM-dd",
      numBackups: 1,
    },
    errors: {
      type: "logLevelFilter",
      level: "ERROR",
      appender: "errorFile",
    },
    out: { type: "stdout" },
  },
  categories: {
    default: {
      appenders: ["app", "errors", "out"],
      level: logLevel,
    },
  },
};
