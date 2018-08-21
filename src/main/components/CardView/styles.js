/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 */
import { StyleSheet } from "react-native";

import { hexToRgba } from "../../../lib/utils/colors";

import common, {
  COLORS,
  THEME
} from "../../styles/common"

export const TRANSPARENT = hexToRgba(THEME.cardBackground, 0.9);

export default StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch",
    backgroundColor: THEME.cardBackground
  },
  outerContainer: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: THEME.cardBackground
  },
  sectionBorder: {
    flex: 1,
    marginTop: 12,
    marginBottom: 8,
    marginLeft: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: THEME.cardSectionBorderColor,
    shadowColor: COLORS.darkdarkGray,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 2,
    shadowOpacity: 0.6
  },
  sectionTitle: {
    position: "absolute",
    top: 3,
    left: 14,
    paddingLeft: 3,
    paddingRight: 3,
    fontFamily: "Lato-Bold",
    fontSize: 14,
    color: THEME.cardSectionBorderColor,
    backgroundColor: THEME.cardBackground
  }
});
