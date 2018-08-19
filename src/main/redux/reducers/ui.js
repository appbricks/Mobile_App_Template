/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 */
import {
  SIGN_IN,
  UPDATE_USER,
  UPDATE_AVATAR
} from "../actions/types";

import Avatar from "../../../lib/presentation/Avatar";

export const initialUIState = (
  avatar = new Avatar()
) => {
  return {
    avatar
  };
};

const reducer = (state, action) => {

  switch (action.type) {

    case SIGN_IN:
    case UPDATE_USER:
    case UPDATE_AVATAR:

      state.avatar.updateAvatar(action.data.user);
      break;
  }
  return state;
};

export default reducer;