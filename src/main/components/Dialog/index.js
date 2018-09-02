/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 */
import React, { Component } from "react";
import {
  View,
  StatusBar,
  Image
} from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"

import LoadingView from "../LoadingView"

import {
  DEVICE,
  APP_ICON,
  APP_ICON_SIZE,
  THEME
} from "../../styles/common"

import { DIALOG } from "../../components/Dialog/dialogStyles"

import styles from "./styles"

type Props = {};
export default class Dialog extends Component<Props> {

  constructor(props) {
    super(props);
  }

  render() {

    appIcon = this.props.appIcon || APP_ICON;
    iconSize = this.props.iconSize || APP_ICON_SIZE;
    dialogWidth = this.props.dialogWidth || DIALOG.width;
    dialogHeight = this.props.dialogHeight || DIALOG.height;
    dialogOpacity = this.props.dialogOpacity || THEME.dialogOpacity;

    return (
      <KeyboardAwareScrollView
        style={{ backgroundColor: "transparent" }}
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={styles.container}
        scrollEnabled={false}
      >

        <StatusBar barStyle="light-content" />
        <View style={[
          styles.dialog,
          {
            width: dialogWidth,
            height: dialogHeight,
            top: (DEVICE.viewportHeight - dialogHeight) / 2,
            left: (DEVICE.viewportWidth - dialogWidth) / 2,
            opacity: dialogOpacity
          }
        ]}>

          {this.props.children}

        </View>
        <Image
          source={appIcon}
          style={[
            styles.appIcon,
            {
              width: iconSize,
              height: iconSize,
              top: (DEVICE.viewportHeight - dialogHeight - iconSize) / 2,
              left: (DEVICE.viewportWidth - iconSize) / 2
            }
          ]} />

        <LoadingView show={this.props.showLoading} />

      </KeyboardAwareScrollView>
    );
  }
}
