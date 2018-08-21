/**
 * Common stylesheets and styling related constants
 */

import { StyleSheet, Dimensions, Platform } from "react-native";

import { hexToRgba } from "../../lib/utils/colors";

export const COLORS = {

  white: "#FFFFFF",
  black: "#000000",

  offWhite: "#FFF3E6",
  beige: "#F5F5DC",
  wheat: "#F5DEB3",

  blue: "#0000FF",
  mattBlue: "#0066CC",
  mattBlueLight: "#0088dd",

  brown: "#964B00",
  darkBrown: "#663300",

  green: "#00FF00",
  mattGreen: "#16a085",

  red: "#FF0000",

  silver: "#C0C0C0",
  lightGray: "#D3D3D3",
  gray: "#808080",
  darkGray: "#959595",
  darkdarkGray: "#525252",

  // Colors picked from App Icon

  iconShade1: "#C7B3B5",
  iconShade2: "#E8DDC9",
  iconShade3: "#EBEBEB",

  iconWhite: "#F8FFFF",
  iconRed: "#EC121E",
  iconBlue: "#78BFD6",
  iconLightBlue: "#AFE5F7",
  iconGray: "#70696A",
  iconLightGray: "#EBEBEB",

  // Social Icon colors
  google: "#DD4B39",
  linkedin: "#007BB6",
  twitter: "#00ACED",
  facebook: "#3B5998",
};

export const THEME = {

  color: COLORS.darkBrown,

  disabledColor: COLORS.gray,
  textInputColor: COLORS.darkdarkGray,

  contextButtonColor: COLORS.mattBlueLight,

  dialogBackground: COLORS.white,
  dialogOpacity: 0.9,

  menuDrawerWidth: 200,
  menuBackground: COLORS.white,
  menuOpacity: 0.8,

  homeBarBackground: hexToRgba(COLORS.black, 0.8),
  homeBarActiveBackground: hexToRgba(COLORS.black, 0.4),

  tabBarBackground: COLORS.black,
  tabBarActiveBackground: COLORS.darkdarkGray,

  stackViewImageBlur: { type: "light", amount: 10 },
  stackViewStatusBar: "light-content",

  cardBackground: COLORS.white,
  cardSectionBorderColor: COLORS.silver,

  homeCardStyle: {
    borderWidth: 2,
    borderColor: COLORS.silver
  },
  homeCardStyleTransparent: {
    borderWidth: 2,
    borderColor: COLORS.silver,
    backgroundColor: hexToRgba(COLORS.white, 0.9)
  },

  avatarViewHeight: 200,
  avatarBackground: COLORS.iconShade1,
  avatarColor: COLORS.white
}

export const IS_IOS = Platform.OS === "ios";
export const { width: VIEWPORT_WIDTH, height: VIEWPORT_HEIGHT } = Dimensions.get("window");

export const STATUS_BAR_HEIGHT = 20;
export const HEADER_HEIGHT = 40;
export const BOTTOM_BAR_HEIGHT = 50;

export const BACKGROUND_IMAGE = require("../../images/background.png");

export const APP_ICON = require("../../images/space-for-rent-small.png");
export const APP_ICON_SIZE = 100;

const baseFontSize = 20;

const styles = StyleSheet.create({

  // **** for debugging layouts
  borderRed: {
    borderWidth: 2,
    borderColor: COLORS.red
  },
  borderBlue: {
    borderWidth: 2,
    borderColor: COLORS.blue
  },
  // **** for debugging layouts

  bigText: {
    fontSize: baseFontSize + 8,
    color: COLORS.white
  },
  mainText: {
    fontSize: baseFontSize,
    color: COLORS.white
  },
  hyperLink: {
    color: COLORS.blue,
    textDecorationLine: "underline"
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch"
  },
});

// For use elsewhere...
styles["baseFontSize"] = baseFontSize;

export default styles;
