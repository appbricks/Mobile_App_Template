/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 */
import { StyleSheet } from "react-native";

import common, { COLORS } from "../../styles/common"

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
    fontFamily: "Lato-Bold",
    fontSize: common.baseFontSize * 0.6,
  }
});
