/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 */
import { StyleSheet } from "react-native";

import {
  COLORS,
  THEME,
  BOTTOM_BAR_HEIGHT
} from "../../styles/common"

const BAR_FONT_SIZE = 12;

export const tabStyles = {
  tabBarStyle: {
    height: BOTTOM_BAR_HEIGHT + BAR_FONT_SIZE,
    backgroundColor: "transparent"
  },
  iconStyle: {
    paddingTop: 4
  },
  textStyle: {
    fontFamily: "Lato-Bold",
    fontSize: BAR_FONT_SIZE
  },
  activeTintColor: COLORS.white,
  activeBackgroundColor: THEME.homeBarActiveBackground,
  inactiveTintColor: COLORS.silver,
  inactiveBackgroundColor: THEME.homeBarBackground
}

export default StyleSheet.create({

});