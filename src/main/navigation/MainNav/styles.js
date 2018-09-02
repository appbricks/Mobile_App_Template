/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 */
import { StyleSheet } from "react-native";

import { hexToRgba } from "../../../lib/utils/colors";

import {
  COLORS,
  THEME,
  DEVICE
} from "../../styles/common";

export const drawerStyles = {
  itemsContainerStyle: {
    backgroundColor: THEME.menuBackground,
    borderRightWidth: 3,
    borderBottomWidth: 3,
    borderColor: THEME.menuBackground,
    opacity: THEME.menuOpacity
  },
  activeTintColor: THEME.menuBackground,
  activeBackgroundColor: THEME.color,
  activeLabelStyle: { color: THEME.menuBackground },
  inactiveTintColor: COLORS.black,
  inactiveBackgroundColor: THEME.menuBackground,
  labelStyle: { color: THEME.color }
};

export const stackStyles = {
  header: {
    height: DEVICE.topBarHeight,
    backgroundColor: THEME.color
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
  container: {
    flex: 1, alignItems: "stretch"
  },
  avatarView: {
    height: THEME.avatarViewHeight,
    borderTopRightRadius: 10,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderColor: THEME.menuBackground,
    backgroundColor: COLORS.black
  },
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