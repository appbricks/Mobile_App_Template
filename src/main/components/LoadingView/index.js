/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 */
import React, { Component } from "react";
import { View } from 'react-native';

import { MaterialIndicator } from "react-native-indicators";

import common, {
  COLORS,
  DEVICE
} from "../../styles/common"
import styles, { LOADING_ICON_SIZE } from "./styles";

type Props = {};
export default class LoadingView extends Component<Props> {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      this.props.show
        ? (
          <View style={[
            styles.container,
            DEVICE.isOrientationPotrait()
              ? {
                width: DEVICE.viewportWidth,
                height: DEVICE.viewportHeight
              }
              : {
                width: DEVICE.viewportHeight,
                height: DEVICE.viewportWidth
              }
          ]}>
            <MaterialIndicator color={COLORS.white} size={LOADING_ICON_SIZE} />
          </View>
        )
        : false
    );
  }
}
