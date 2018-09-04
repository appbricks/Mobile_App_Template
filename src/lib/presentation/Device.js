/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 * 
 * The Device object contains device display parameters 
 * along with other usefule device information. 
 */
import React, { Component } from "react";
import {
  Dimensions,
  Platform,
  DeviceInfo,
  NativeModules,
  StatusBar
} from "react-native";

import Orientation from "react-native-orientation";

import { functionKey } from "../utils/functions";

type Props = {};

// Iphone X Dimensions
// https://mediag.com/news/popular-screen-resolutions-designing-for-all/

const IPHONEX_VIEWPORT_WIDTH = 375;
const IPHONEX_VIEWPORT_HEIGHT = 812;

export default class Device {

  constructor(
    topBarHeight: number,
    bottomBarHeight: number
  ) {
    const {
      width,
      height
    } = Dimensions.get("window");

    this.viewportWidth = width;
    this.viewportHeight = height;

    this.topBarHeight = topBarHeight;
    this.bottomBarHeight = bottomBarHeight;

    this.headerHeight = this._headerHeight
      = this.topBarHeight;
    this.homeViewHeight = this._homeViewHeight
      = this.viewportHeight - this.headerHeight - this.bottomBarHeight;

    this.isIOS = (Platform.OS === "ios");
    this.isAndroid = (Platform.OS === "android");
    this.isWeb = (Platform.OS === "web")

    this.isIPhoneX = this._isIPhoneX();

    this.orientation = Orientation.getInitialOrientation();
    Orientation.addOrientationListener(this._orientationDidChange.bind(this));

    this.orientationListeners = {};
    this._calculateDynamicDimensions(this.orientation);
  }

  isOrientationPotrait() {
    return (this.orientation === "PORTRAIT"
      || this.orientation === "PORTRAITUPSIDEDOWN");
  }

  addOrientationListener(listener: (orientation: String) => void) {
    this.orientationListeners[functionKey(listener)] = listener;
  }

  removeOrientationListener(listener: (orientation: String) => void) {
    delete this.orientationListeners[functionKey(listener)];
  }

  orientationAware(
    C: Component,
    onChange?: (props, orientation) => (void)
  ): Component {

    const device = this;

    return class extends Component<Props> {

      constructor(props) {
        super(props);
        this.state = { orientation: device.orientation }
        this._onChange = onChange;
        this._orientationListenerFn = this._orientationListener.bind(this);
      }
      componentDidMount() {
        device.addOrientationListener(this._orientationListenerFn);
      }
      componentWillUnmount() {
        device.removeOrientationListener(this._orientationListenerFn);
      }
      _orientationListener(orientation) {
        if (this._onChange) {
          if (this._onChange(orientation, this.props)) {
            this.setState({});
          }

        } else {
          this.setState({});
        }
      }
      render() {
        return (
          <C {...this.props} />
        );
      }
    }
  }

  _isIPhoneX() {
    if (Platform.OS === 'web') return false;

    const {
      PlatformConstants = {}
    } = NativeModules;
    const {
      minor = 0
    } = PlatformConstants.reactNativeVersion || {};

    if (minor >= 50) {
      return DeviceInfo.isIPhoneX_deprecated;
    }

    return (
      this.isIOS
      && (
        (this.viewportHeight === IPHONEX_VIEWPORT_HEIGHT
          && this.viewportWidth === IPHONEX_VIEWPORT_WIDTH)
        || (this.viewportHeight === IPHONEX_VIEWPORT_WIDTH
          && this.viewportWidth === IPHONEX_VIEWPORT_HEIGHT)
      )
    );
  }

  _orientationDidChange(orientation) {
    this.orientation = orientation;
    this._calculateDynamicDimensions(orientation);
  }

  _calculateDynamicDimensions(orientation) {

    StatusBar.setHidden(this.orientation === "LANDSCAPE");

    const { StatusBarManager } = NativeModules;
    if (StatusBarManager && StatusBarManager.getHeight) {

      StatusBarManager.getHeight(statusBarHeight => {

        const { height } = statusBarHeight;

        this.headerHeight = this._headerHeight + height;
        this.homeViewHeight = this._homeViewHeight - height;

        if (this.isIPhoneX) {
          // Account for sensor inset space
          this.homeViewHeight -= 34;
        }

        Object.values(this.orientationListeners)
          .forEach(listener => listener(orientation));
      })
    } else {

      statusBarHeight = (
        this.isIOS
          ? this.isIPhoneX
            ? 44
            : 20
          : this.isAndroid
            ? StatusBar.currentHeight || 0
            : 0
      )

      this.headerHeight = this._headerHeight + statusBarHeight;
      this.homeViewHeight = this._homeViewHeight - statusBarHeight;

      if (this.isIPhoneX) {
        // Account for sensor inset space
        this.homeViewHeight -= 34;
      }

      Object.values(this.orientationListeners)
        .forEach(listener => listener(orientation));
    }
  }
}
