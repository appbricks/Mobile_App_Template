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

  iconShade1: "#c7b3b5",
  iconShade2: "#e8ddc9",
  iconShade3: "#ebebeb",

  iconWhite: "#f8ffff",
  iconRed: "#ec121e",
  iconBlue: "#78bfd6",
  iconLightBlue: "#afe5f7",
  iconGray: "#70696a",
  iconLightGray: "#ebebeb",

  // Social Icon colors
  google: "#dd4b39",
  linkedin: "#007bb6",
  twitter: "#00aced",
  facebook: "#3b5998",
};

export const THEME = {

  color: COLORS.darkBrown,

  disabledColor: COLORS.gray,
  textInputColor: COLORS.darkdarkGray,

  dialogBackground: COLORS.white,
  dialogOpacity: 0.9,

  menuDrawerWidth: 200,
  menuBackground: COLORS.white,
  menuOpacity: 0.8,

  homeBarBackground: hexToRgba(COLORS.black, 0.8),
  homeBarActiveBackground: hexToRgba(COLORS.black, 0.4),

  stackViewImageBlur: { type: "light", amount: 10 },
  stackViewStatusBar: "light-content",

  avatarViewHeight: 200,
  avatarBackground: COLORS.iconShade1,
  avatarColor: COLORS.white
}

export const IS_IOS = Platform.OS === "ios";
export const { width: VIEWPORT_WIDTH, height: VIEWPORT_HEIGHT } = Dimensions.get("window");

export const STATUS_BAR_HEIGHT = 20;
export const HEADER_HEIGHT = 40;
export const BOTTOM_BAR_HEIGHT = 45;

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
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
});

// For use elsewhere...
styles["baseFontSize"] = baseFontSize;

export default styles;
