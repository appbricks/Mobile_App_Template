/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 */
import React, { Component } from "react";
import { StatusBar } from 'react-native';

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"

import {
  VIEWPORT_HEIGHT,
  HEADER_HEIGHT,
  THEME
} from "../../styles/common";
import styles from "./styles";

type Props = {};
export default class StackView extends Component<Props> {

  constructor(props) {
    super(props);

    this.childRefs = [];
    this.childLayouts = [];

    if (typeof this.props.children != "undefined") {

      if (Array.isArray(this.props.children)) {

        this.props.children.forEach(child => {
          child.type.prototype.addChildRef = this._addChildRef.bind(this);
          child.type.prototype.addChildLayout = this._addChildLayout.bind(this);
        });

      } else {
        this.props.children.type.prototype.addChildRef = this._addChildRef.bind(this);
        this.props.children.type.prototype.addChildLayout = this._addChildLayout.bind(this);
      }

      this.marginTop = HEADER_HEIGHT + 5;
      this.viewHeight = this.marginTop;
    }

    this.state = {
      viewHeight: VIEWPORT_HEIGHT
    };
  }

  componentDidMount() {
    this._blurBackgroundImage(true);
  }

  componentDidUpdate() {
    this._blurBackgroundImage(true);
  }

  componentWillUnmount() {
    this._blurBackgroundImage(false);
  }

  _addChildRef(ref) {
    this.childRefs.push(ref);
  }

  _addChildLayout(layout) {

    this.childLayouts.push(layout);
    this.viewHeight += layout.height + 10;

    if (this.childLayouts.length == this.childRefs.length) {
      this.viewHeight += 5;

      this.setState({
        viewHeight: this.viewHeight
      })
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

  render() {

    const {
      style,
      ...props
    } = this.props;

    return (
      <KeyboardAwareScrollView
        contentContainerStyle={[
          {
            marginTop: this.marginTop,
            height: this.state.viewHeight
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
    )
  }
}
