/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 */
import { StyleSheet } from "react-native";

import {
  COLORS,
  THEME,
  HEADER_HEIGHT,
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

export const stackStyles = {
  header: {
    height: HEADER_HEIGHT,
    backgroundColor: THEME.homeBarBackground
  },
  headerTitle: {
    color: THEME.menuBackground
  },
  headerBackTitle: {
    color: THEME.menuBackground
  },
  headerIconColor: THEME.menuBackground,
  cardOpacity: 0.9
}

export default StyleSheet.create({
  stackHeaderIcon: {
    marginTop: 5,
    marginLeft: 10,
    marginBottom: 5,
    marginRight: 10
  },
  stackHeaderBackStyle: {
    flexDirection: "row",
    alignItems: "center",
  },
  stackHeaderBackTitleStyle: {
    paddingTop: 3,
    color: THEME.menuBackground,
    fontFamily: "Lato-Regular",
    fontSize: 12
  }
});
