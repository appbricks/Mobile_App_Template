/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 */
import { createStore, applyMiddleware } from "redux";

import { reducer } from "./reducers/reducer";
import { reduxLogger } from "../../lib/utils/Logger";

import { initAuthStore } from "./reducers/auth"

import {
  updateAvatar
} from "./actions/ui";
import {
  loadAuthState,
  signInUser,
  signOutUser,
  resetUser,
  updateUser
} from "./actions/auth";

const reduxStore = createStore(
  reducer,
  applyMiddleware(reduxLogger)
);

export {
  // Redux store singleton
  reduxStore,

  // Initializes the authentication local 
  // storage which backs up the redux
  // auth state
  initAuthStore,

  // User action dispatch creators
  loadAuthState,
  signInUser,
  signOutUser,
  resetUser,
  updateUser,

  // UI action dispatch creators
  updateAvatar
}
