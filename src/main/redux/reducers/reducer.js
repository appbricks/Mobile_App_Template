/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 */

import uiReducer, { initialUIState } from "./ui"
import authReducer, { initialAuthState } from "./auth"

/** 
 * Initial state
 * =============
 *
 * ui: {
 * },
 * auth: {
 *   user: <User>,            User instance
 *   timestamp: <number>      Time in milliseconds from epoch when user signed in
 *   newRegistration: <bool>  Whether this is a new registration
 * }
 * 
 */

const initialState = () => {
  return {
    ui: initialUIState(),
    auth: initialAuthState()
  };
};

export const reducer = (state = initialState(), action) => {

  return {
    ui: uiReducer(state.ui, action),
    auth: authReducer(state.auth, action)
  };
};
