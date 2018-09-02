/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 */

const META = "__listener_id";
var fnID = 0;

/**
 * Adds a key to a function object.
 * 
 * @param {*} fn  the function object to associated the key with
 */
export function functionKey(fn) {

  if (!fn.hasOwnProperty(META)) {
    if (!Object.isExtensible(fn)) {
      return 'F';
    }

    Object.defineProperty(fn, META, {
      value: 'L' + ++fnID,
    });
  }

  return fn[META];
}
