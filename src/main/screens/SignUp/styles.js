/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 */
import { StyleSheet } from "react-native";

import common, { COLORS, APP_ICON_SIZE } from "../../styles/common"
import { DIALOG } from "../../components/Dialog/dialogStyles"

export default StyleSheet.create({
  textInputContainer: {
    height: common.baseFontSize * 1.5
  },
  textInput: {
    fontSize: common.baseFontSize * 0.9
  },
  legalText: {
    width: DIALOG.width * 0.695
  }
})
