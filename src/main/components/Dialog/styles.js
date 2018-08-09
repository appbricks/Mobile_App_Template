/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 */
import { StyleSheet } from "react-native";

import { COLORS, THEME } from "../../styles/common"

export default StyleSheet.create({
  container: {
    position: "absolute"
  },
  appIcon: {
    position: "absolute"
  },
  dialog: {
    position: "absolute",
    alignItems: "center",
    borderWidth: 2,
    borderColor: COLORS.darkdarkGray,
    shadowColor: COLORS.black,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    backgroundColor: THEME.dialogBackground
  }
})
