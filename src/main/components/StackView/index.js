/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 */
import React, { Component } from "react";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-navigation";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"

import {
  THEME,
  DEVICE
} from "../../styles/common";
import styles from "./styles";

type Props = {};
export default class StackView extends Component<Props> {

  constructor(props) {
    super(props);

    this.childRefs = [];

    if (this.props.children) {

      if (Array.isArray(this.props.children)) {
        this.props.children.forEach(child => {
          child.type.prototype.addChildRef = this._addChildRef.bind(this);
          child.type.prototype.addChildLayout = this._addChildLayout.bind(this);
        });

      } else {
        this.props.children.type.prototype.addChildRef = this._addChildRef.bind(this);
        this.props.children.type.prototype.addChildLayout = this._addChildLayout.bind(this);
      }

      this.state = {
        topMargin: DEVICE.headerHeight + 5,
        scrollHeight: 0
      };

      this._scrollHeight = 0;
      this._layoutUpdateCounter = 0;
      this._orientationListenerFn = this._orientationListener.bind(this);

    } else {
      this.state = {
        topMargin: 0,
        scrollHeight: this.props.scrollHeight || DEVICE.viewportHeight
      };
    }
  }

  componentDidMount() {

    if (this._orientationListenerFn) {
      DEVICE.addOrientationListener(this._orientationListenerFn);
    }
  }

  componentDidUpdate() {
    this._blurBackgroundImage(true);
  }

  componentWillUnmount() {
    this._blurBackgroundImage(false);

    if (this._orientationListenerFn) {
      DEVICE.removeOrientationListener(this._orientationListenerFn);
    }
  }

  _addChildRef(ref) {
    this.childRefs.push(ref);
  }

  _addChildLayout(layout) {

    this._scrollHeight += layout.height + 10;
    if (++this._layoutUpdateCounter == this.childRefs.length) {

      this.setState({
        scrollHeight: this._scrollHeight + 5
      })

      this._layoutUpdateCounter = 0;
      this._scrollHeight = 0;
    }
  }

  _blurBackgroundImage(blur) {
    const { backgroundImage, blurBackground } = this.props;

    if (backgroundImage && blurBackground) {
      if (blur) {
        backgroundImage.blur(THEME.stackViewImageBlur.type, THEME.stackViewImageBlur.amount);
      } else {
        backgroundImage.unblur();
      }
    }
  }

  _orientationListener(orientation) {

    this.setState({
      topMargin: DEVICE.headerHeight + 5
    });
  }

  render() {

    const {
      style,
      ...props
    } = this.props;

    return (
      <SafeAreaView
        forceInset={{ top: "never", horizontal: "always" }}
        style={{ flex: 1 }}>

        <KeyboardAwareScrollView
          contentContainerStyle={[
            {
              marginTop: this.state.topMargin,
              height: this.state.topMargin + this.state.scrollHeight
            },
            styles.container,
            style
          ]}
          resetScrollToCoords={{ x: 0, y: 0 }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          pinchGestureEnabled={false}
          {...props}
        >
          <StatusBar barStyle={THEME.stackViewStatusBar} />
          {this.props.children}
        </KeyboardAwareScrollView>

      </SafeAreaView>
    )
  }
}
