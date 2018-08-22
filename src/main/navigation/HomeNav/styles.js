/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 */
import { StyleSheet } from "react-native";

import {
  COLORS,
  THEME,
  TOP_BAR_HEIGHT,
  BOTTOM_BAR_HEIGHT
} from "../../styles/common"

export const tabStyles = {
  tabBarStyle: {
    height: BOTTOM_BAR_HEIGHT,
    backgroundColor: "transparent"
  },
  iconStyle: {
    paddingTop: 4
  },
  textStyle: {
    fontFamily: "Lato-Bold",
    fontSize: THEME.tabBarFontSize
  },
  inactiveTabStyle: {
    borderTopWidth: 5,
    borderColor: THEME.tabBarActiveBackground
  },
  activeTintColor: COLORS.white,
  activeBackgroundColor: THEME.tabBarActiveBackground,
  inactiveTintColor: COLORS.darkGray,
  inactiveBackgroundColor: THEME.tabBarBackground
}

export const stackStyles = {
  header: {
    height: TOP_BAR_HEIGHT,
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
