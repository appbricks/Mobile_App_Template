/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 */

/**
 * Returns a hex color as "rgb()" string with
 * a transparency value if provided.
 * 
 * @param {*} hex           Hex color value
 * @param {*} transparency  Decimal transparency value from 0 to 1.
 */
export function hexToRgba(hex, transparency = 1) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  return result ?
    "rgba("
    + parseInt(result[1], 16) + ","
    + parseInt(result[2], 16) + ","
    + parseInt(result[3], 16) + ","
    + transparency + ")"
    : null;
}
