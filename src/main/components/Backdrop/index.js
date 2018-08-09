/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 */
import React, { Component } from "react";
import { ImageBackground, findNodeHandle } from "react-native";
import { BlurView } from 'react-native-blur';

import MutableImage from "../../../lib/presentation/MutableImage"

import styles from "./styles";

type Props = {};

export default class Backdrop extends Component<Props> {

  constructor(props) {
    super(props);

    this.imageBackground = null;

    this.state = {
      image: this.props.image,

      blurType: null,
      blurAmount: null,

      viewRef: null,
    };

    this.props.image.setUpdateCallback((uri, options?) => {

      if (options) {

        const { blurType, blurAmount } = options;

        this.setState({
          blurType: blurType,
          blurAmount: blurAmount
        });

      } else {
        this.setState({});
      }
    });
  }

  _imageLoaded() {
    this.setState({ viewRef: findNodeHandle(this.imageBackground) });
  }

  render() {

    return (
      <ImageBackground
        ref={(img) => { this.imageBackground = img; }}
        style={styles.backdrop}
        source={this.state.image.getUri()}
        resizeMode="cover"
        onLoadEnd={this._imageLoaded.bind(this)}
      >

        {this.state.blurType
          ? (
            <BlurView
              style={styles.absolute}
              viewRef={this.state.viewRef}
              blurType={this.state.blurType}
              blurAmount={this.state.blurAmount}
            />
          )
          : false
        }

        {this.props.children}

      </ImageBackground>
    );
  }
}

/**
 * @param {MutableImage} image
 * @param {Component} C
 * @returns {Component}
 */
export function withBackdrop(image, C, key = "N/A") {

  return class extends Component<Props> {

    static router = C.router;

    render() {
      const { navigation } = this.props;

      return (
        <Backdrop image={image}>
          <C navigation={navigation} {...this.props} />;
        </Backdrop>
      );
    }
  };
}
