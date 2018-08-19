/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 */
import { StyleSheet } from "react-native";

import { COLORS, THEME } from "../../styles/common";

export const WATERMARK_SIZE = THEME.menuDrawerWidth * 0.6;
const WATERMARK_TOP = (THEME.avatarViewHeight - WATERMARK_SIZE) / 2;
const WATERMARK_LEFT = (THEME.menuDrawerWidth - WATERMARK_SIZE) / 2;

export default StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  overlayStyle: {
    backgroundColor: THEME.avatarBackground
  },
  avatarTitleHeader: {
    position: "absolute",
    top: 0,
    left: 0,
    paddingTop: 7,
    width: THEME.menuDrawerWidth - 3,
    color: THEME.menuBackground,
    fontFamily: "Lato-Bold",
    fontSize: 15,
    textAlign: "center"
  },
  avatarTitleSmall: {
    fontFamily: "Lato-Bold",
    fontSize: 50
  },
  avatarTitleLarge: {
    fontFamily: "Lato-Bold",
    fontSize: 70
  },
  avatarIconWatermark: {
    position: "absolute",
    width: WATERMARK_SIZE,
    height: WATERMARK_SIZE,
    top: WATERMARK_TOP,
    left: WATERMARK_LEFT,
  }
});
