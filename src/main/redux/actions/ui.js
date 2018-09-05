/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 * 
 * UI action dispatch creators
 */
import {
  UPDATE_AVATAR,
  SET_HOME_CONTEXT
} from "./types";

import Logger from "../../../lib/utils/Logger";

export const updateAvatar = (user) => {

  if (user) {

    return {
      type: UPDATE_AVATAR,
      data: {
        user
      }
    };

  } else {

    Logger.error("updateUser",
      "user instance for UPDATE_USER redux action type cannot be null");

    return {};
  }
};

export const setHomeContext = (name) => {
  return {
    type: SET_HOME_CONTEXT,
    data: {
      name
    }
  }
}
