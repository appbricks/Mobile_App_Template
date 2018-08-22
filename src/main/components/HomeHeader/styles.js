/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 */
import { StyleSheet } from "react-native";

import {
  VIEWPORT_WIDTH,
  HEADER_HEIGHT,
  COLORS,
  THEME
} from "../../styles/common"

export default StyleSheet.create({
  outerContainer: {
    backgroundColor: THEME.homeBarBackground,
    position: "absolute",
    width: VIEWPORT_WIDTH,
    height: HEADER_HEIGHT,
    top: 0,
    left: 0,
    borderBottomWidth: 0
  },
  textStyle: {
    color: COLORS.white,
    fontFamily: "Lato-Bold",
    fontSize: 16
  }
});
