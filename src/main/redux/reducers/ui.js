/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 */
import {
  SIGN_IN,
  UPDATE_USER,
} from "../actions/types";

export const initialUIState = (
) => {
  return {};
};

const reducer = (state, action) => {

  switch (action.type) {

    case SIGN_IN:
    case UPDATE_USER:
      break;
  }
  return state;
};

export default reducer;