/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 */
import React, { Component } from "react";
import { View, Text } from 'react-native';

import HomeHeader from "../../components/HomeHeader"

import Logger from "../../../lib/utils/Logger";

import common, { COLORS } from "../../styles/common"
import styles from "./styles"

type Props = {};
export default class Alerts extends Component<Props> {

  constructor(props) {
    super(props);
  }

  render() {
    Logger.logRender(this);

    const { mainNavigator } = this.props.screenProps;

    return (
      <View style={common.container}>
        <HomeHeader
          onMenu={mainNavigator.openDrawer}
          title="Alerts"
        />

      </View>
    );
  }
}
