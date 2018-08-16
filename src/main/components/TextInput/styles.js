/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 */
import { StyleSheet } from "react-native";

import common, {
  COLORS,
  THEME
} from "../../styles/common"

export const TEXT_INPUT_CONTEXT = {
  iconSize: 15,
  fontFamily: "Lato-Bold",
  fontSize: common.baseFontSize * 0.6,
  fontWeight: "bold"
}

export default StyleSheet.create({
  textInputBadge: {
    position: "absolute",
    overflow: "hidden",
    borderWidth: 0,
    borderRadius: 6,
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: COLORS.red,
    color: COLORS.white,
    fontFamily: TEXT_INPUT_CONTEXT.fontFamily,
    fontSize: TEXT_INPUT_CONTEXT.fontSize,
    fontWeight: TEXT_INPUT_CONTEXT.fontWeight
  },
  button: {
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 3,
    justifyContent: "flex-start",
    borderWidth: 1,
    borderColor: COLORS.silver,
    borderRadius: 0,
    shadowColor: COLORS.darkdarkGray,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2
  },
  disabledButton: {
    backgroundColor: THEME.disabledColor,
  },
  buttonTitle: {
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 3,
    paddingRight: 5,
    fontFamily: TEXT_INPUT_CONTEXT.fontFamily,
    fontSize: TEXT_INPUT_CONTEXT.fontSize,
    fontWeight: TEXT_INPUT_CONTEXT.fontWeight
  }
});
