/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 */
import {
  LOAD_AUTH_STATE,
  RESET_USER,
  UPDATE_USER,
  SIGN_IN,
  SIGN_OUT
} from "./types";

export const loadAuthState = () => {
  return { type: LOAD_AUTH_STATE, data: {} };
};

export const resetUser = () => {
  return { type: RESET_USER, data: {} };
};

export const updateUser = () => {
  return { type: UPDATE_USER, data: {} };
};

export const signInUser = () => {
  return { type: SIGN_IN, data: { signInTime: Date.now() } };
};

export const signOutUser = () => {
  return { type: SIGN_OUT, data: {} };
};
