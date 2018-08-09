/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 */

import AuthReducer, { initialAuthState } from "./auth"

/** 
 * Initial state
 * =============
 *
 * auth: {
 *   user: <User>,            User instance
 *   timestamp: <number>      Time in milliseconds from epoch when user signed in
 *   newRegistration: <bool>  Whether this is a new registration
 * }
 * 
 */

const initialState = () => {
  return {
    auth: initialAuthState()
  };
};

export const reducer = (state = initialState(), action) => {

  return {
    auth: AuthReducer(state.auth, action)
  };
};
