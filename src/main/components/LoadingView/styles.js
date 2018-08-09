/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 */
import { StyleSheet } from "react-native";

import {
  VIEWPORT_WIDTH,
  VIEWPORT_HEIGHT,
} from "../../styles/common"

export const LOADING_ICON_SIZE = 60;

export default StyleSheet.create({
  container: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: "absolute",
    width: VIEWPORT_WIDTH,
    height: VIEWPORT_HEIGHT,
    top: 0,
    left: 0
  }
});
