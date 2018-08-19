/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 */
import React, { Component } from "react";
import { ScrollView, StatusBar } from 'react-native';

import {
  VIEWPORT_HEIGHT,
  STATUS_BAR_HEIGHT,
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

      this.marginTop = STATUS_BAR_HEIGHT + HEADER_HEIGHT;

      if (
        (!Array.isArray(this.props.children)
          && this.props.children.type.displayName == "CardView"
        )
        || (this.props.children.length > 0
          && this.props.children[0].type.displayName == "CardView"
        )
      ) {

        this.marginTop += 5
      }
      this.viewHeight = this.marginTop;
    }

    this.state = {
      viewHeight: VIEWPORT_HEIGHT
    };
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
      <ScrollView
        contentContainerStyle={[
          {
            marginTop: this.marginTop,
            height: this.state.viewHeight
          },
          styles.container,
          style
        ]}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        pinchGestureEnabled={false}
        {...props}
      >
        <StatusBar barStyle={THEME.stackViewStatusBar} />
        {this.props.children}
      </ScrollView>
    )
  }
}
