/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 */

/**
 * Set a timeout in milliseconds and 
 * call the given function when done.
 * 
 * @param {*} cb     the callback function
 * @param {*} delay  the delay in milliseconds to wait before triggering
 */
export function timeout(cb, delay) {

  return new Promise((resolve, reject) => {

    setTimeout(() => {

      try {
        resp = true;
        if (cb) {
          resp = cb();
        }
        resolve(resp)

      } catch (exception) {
        reject(exception)
      }

    }, delay);
  });
}
