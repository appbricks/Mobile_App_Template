/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 */

import UIReducer, { initialUIState } from "./ui"
import AuthReducer, { initialAuthState } from "./auth"

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
    ui: UIReducer(state.ui, action),
    auth: AuthReducer(state.auth, action)
  };
};
