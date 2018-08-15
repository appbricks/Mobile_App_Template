/**
 * Styling related constants for dialogs views
 */

import { StyleSheet, Dimensions, Platform } from "react-native";

import common, { COLORS, THEME } from "../../styles/common";

export const DIALOG = {
  width: 300,
  height: 450,

  // Size of icon within input
  // fields and buttons
  widgetIconSize: 20,

  // Colors
  checkBoxEnabledColor: THEME.color,
  checkBoxDisabledColor: THEME.disabledColor
};

export default StyleSheet.create({

  row: {
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "center",
    paddingTop: 2,
    paddingLeft: 15,
    paddingBottom: 2,
    paddingRight: 15
  },
  alignBottom: {
    position: "absolute",
    bottom: 0,
    marginBottom: 20
  },
  textContainer: {
    flex: 1
  },
  textLabel: {
    color: THEME.color,
    fontFamily: "Lato-Bold",
    fontSize: common.baseFontSize * 0.7
  },
  legalText: {
    fontFamily: "Lato-Light",
    fontSize: 14,
    textAlign: "justify"
  },
  textInput: {
    flex: 1,
    textAlign: "left",
    color: THEME.textInputColor,
    fontFamily: "Lato-Regular",
    fontSize: common.baseFontSize * 0.95
  },
  checkBoxRow: {
    width: DIALOG.width,
    justifyContent: "flex-start"
  },
  checkBoxContainer: {
    margin: 0,
    padding: 0,
    borderWidth: 0,
    backgroundColor: "transparent"
  },
  checkBoxEnabled: {
    color: DIALOG.checkBoxEnabledColor
  },
  checkBoxDisabled: {
    color: DIALOG.checkBoxDisabledColor
  },
  checkBoxHelpText: {
    marginLeft: 45,
    marginRight: 10,
    fontFamily: "Lato-Light",
    fontSize: 10,
    textAlign: "justify"
  },
  smsInputContainer: {
    width: DIALOG.width * 0.85,
  },
  smsInput: {
    fontSize: common.baseFontSize * 0.9,
    textAlign: "center"
  },
  smsButton: {
    justifyContent: "center",
    width: 150,
  },
  button: {
    backgroundColor: THEME.color,
    width: 105,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: "flex-start",
    borderWidth: 1,
    borderColor: COLORS.black,
    borderRadius: 0,
    shadowColor: COLORS.black,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  disabledButton: {
    backgroundColor: THEME.disabledColor,
  },
  nextButton: {
    marginLeft: 15
  },
  buttonTitle: {
    fontFamily: "Lato-Bold",
    fontSize: common.baseFontSize * 0.8
  }
});

/**
 * Returns the color for a checkbox element 
 * as a style object or color value.
 * 
 * @param {*} asStyleObject 
 * @param {*} disabled 
 */
export function getCheckBoxColor(asStyleObject, disabled?) {

  if (asStyle) {
    if (disabled) {
      return { color: DIALOG.checkBoxDisabledColor };
    } else {
      return { color: DIALOG.checkBoxEnabledColor };
    }

  } else {
    if (disabled) {
      return DIALOG.checkBoxDisabledColor;
    } else {
      return DIALOG.checkBoxEnabledColor;
    }
  }
}
