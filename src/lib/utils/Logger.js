/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 */

import {
  LOG_LEVEL_TRACE_C,
  LOG_LEVEL_TRACE,
  LOG_LEVEL_DEBUG,
  LOG_LEVEL_INFO,
  LOG_LEVEL_WARN,
  LOG_LEVEL_ERROR
} from "./constants";

import {
  LOG_LEVEL
} from "../../main/config/logger";

function timeStamp() {

  let now = new Date();
  let date = [now.getMonth() + 1, now.getDate(), now.getFullYear()];
  let time = [now.getHours(), now.getMinutes(), now.getSeconds()];
  let suffix = (time[0] < 12) ? "AM" : "PM";

  // Convert hour from military time
  time[0] = (time[0] < 12) ? time[0] : time[0] - 12;
  // If hour is 0, set it to 12
  time[0] = time[0] || 12;

  // Prefix with '0' to ensure 
  // fields have consistent length
  for (var i = 0; i < 2; i++) {
    if (date[i] < 10) {
      date[i] = "0" + date[i];
    }
  }
  for (var i = 0; i < 3; i++) {
    if (time[i] < 10) {
      time[i] = "0" + time[i];
    }
  }

  // Return the formatted string
  return date.join("/") + " " + time.join(":") + " " + suffix;
}

export default class Logger {

  constructor(obj) {
    if (obj instanceof Object) {
      this.name = obj.constructor.name;
    } else {
      this.name = obj;
    }
  }

  static logRender(C) {
    if (LOG_LEVEL == LOG_LEVEL_TRACE_C) {
      console.log("%c[" + timeStamp() + "] Rendering component: ",
        "color: #000099; font-weight: bold", C);
    }
  }

  trace(message, ...args) {
    if (LOG_LEVEL == LOG_LEVEL_TRACE) {
      Logger.trace(this.name, message, ...args);
    }
  }

  static trace(name, message, ...args) {
    if (LOG_LEVEL == LOG_LEVEL_TRACE) {
      console.log("[" + timeStamp() + "] TRACE (" + name + "): " + message, ...args);
    }
  }

  debug(message, ...args) {
    if (LOG_LEVEL <= LOG_LEVEL_DEBUG) {
      Logger.debug(this.name, message, ...args);
    }
  }

  static debug(name, message, ...args) {
    if (LOG_LEVEL <= LOG_LEVEL_DEBUG) {
      console.log("[" + timeStamp() + "] DEBUG (" + name + "): " + message, ...args);
    }
  }

  info(message, ...args) {
    if (LOG_LEVEL <= LOG_LEVEL_INFO) {
      Logger.info(this.name, message, ...args);
    }
  }

  static info(name, message, ...args) {
    if (LOG_LEVEL <= LOG_LEVEL_INFO) {
      console.log("%c[" + timeStamp() + "] INFO (" + name + "): " + message,
        "color: #009933; font-style: italic", ...args);
    }
  }

  warn(message, ...args) {
    if (LOG_LEVEL <= LOG_LEVEL_WARN) {
      Logger.warn(this.name, message, ...args);
    }
  }

  static warn(name, message, ...args) {
    if (LOG_LEVEL <= LOG_LEVEL_WARN) {
      console.log("%c[" + timeStamp() + "] WARN (" + name + "): " + message,
        "color: #FF9933; font-weight: bold", ...args);
    }
  }

  error(message, ...args) {
    if (LOG_LEVEL <= LOG_LEVEL_ERROR) {
      Logger.error(this.name, message, ...args);
    }
  }

  static error(name, message, ...args) {
    if (LOG_LEVEL <= LOG_LEVEL_ERROR) {
      console.log("%c[" + timeStamp() + "] ERROR (" + name + "): " + message,
        "color: #CC0000; font-weight: bold", ...args);
    }
  }
}
