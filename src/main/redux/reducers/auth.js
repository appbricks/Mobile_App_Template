/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 */
import {
  LOAD_AUTH_STATE,
  RESET_USER,
  UPDATE_USER,
  SIGN_IN,
  SIGN_OUT
} from "../actions/types";

import * as Keychain from 'react-native-keychain';

import User from "../../../lib/model/User";

import LocalStorage from "../../../lib/persistance/LocalStorage"
import Logger from "../../../lib/utils/Logger";

const authStore = new LocalStorage("auth");

export const initAuthStore = async (user) => {

  await authStore.init();

  const { username, password } = await Keychain.getGenericPassword();
  if (username !== undefined) {

    user.username = username;
    user.password = password;

    Logger.trace("auth reducer",
      "credentials for user '" +
      (password == "" ? username : username + "/****") +
      "' loaded from the device key chain.");
  }
}

export const initialAuthState = (
  user = new User(),
  timestamp = -1,
) => {
  return {
    user,
    timestamp
  };
};

const reducer = (state, action) => {

  switch (action.type) {

    case LOAD_AUTH_STATE:

      u = authStore.getItem("user");
      if (u) {
        state.user.fromJSON(u);

        t = authStore.getItem("timestamp");
        state.timestamp = (t ? t : Date.now());

        Logger.trace("auth reducer", "auth state read from local store: ", state);
      }
      break;

    case SIGN_IN:

      let user = action.data.user;
      let signInTime = action.data.signInTime;

      state.user = user;
      state.timestamp = signInTime;

      password = user.password;
      if (user.enableBiometric || user.rememberFor24h) {
        saveCredentials(user.username, password);
      } else {
        saveCredentials(user.username, "");
      }

      authStore.setItem("user", user.toJSON());
      authStore.setItem("timestamp", state.timestamp);
      break;

    case UPDATE_USER:

      state.user = action.data.user;
      authStore.setItem("user", state.user.toJSON());
      break;

    case SIGN_OUT:
    case RESET_USER:
      deleteCredentials();
      authStore.removeItem("user");
      authStore.removeItem("timestamp");
      return initialAuthState();
  }
  return state;
};

let keyChain = Promise.resolve();
const saveCredentials = async (u, p) => {
  await keyChain;

  await Keychain.setGenericPassword(u, p);

  Logger.trace("auth reducer",
    "credentials for user '" + u +
    "' saved to the device key chain.");
};
const deleteCredentials = async () => {
  await keyChain;

  await Keychain.resetGenericPassword()

  Logger.trace("auth reducer",
    "credentials deleted from the device key chain.");
};

export default reducer;
