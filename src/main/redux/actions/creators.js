/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 */
import {
  LOAD_AUTH_STATE,
  SIGN_IN,
  SIGN_OUT,
  RESET_USER,
  UPDATE_USER,
  UPDATE_AVATAR
} from "./types";

import Logger from "../../../lib/utils/Logger";

export const loadAuthState = () => {
  return {
    type: LOAD_AUTH_STATE,
    data: {}
  };
};

export const signInUser = (user) => {

  if (user) {

    return {
      type: SIGN_IN,
      data: {
        user: user,
        signInTime: Date.now()
      }
    };

  } else {

    Logger.error("signInUser",
      "user instance for SIGN_IN redux action type cannot be null");

    return {};
  }
};

export const signOutUser = () => {
  return {
    type: SIGN_OUT,
    data: {}
  };
};

export const resetUser = () => {
  return {
    type: RESET_USER,
    data: {}
  };
};

export const updateUser = (user) => {

  if (user) {

    return {
      type: UPDATE_USER,
      data: {
        user: user
      }
    };

  } else {

    Logger.error("updateUser",
      "user instance for UPDATE_USER redux action type cannot be null");

    return {};
  }
};

export const updateAvatar = (user) => {

  if (user) {

    return {
      type: UPDATE_AVATAR,
      data: {
        user: user
      }
    };

  } else {

    Logger.error("updateUser",
      "user instance for UPDATE_USER redux action type cannot be null");

    return {};
  }
};
