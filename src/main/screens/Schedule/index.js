/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 */
import React, { Component } from "react";
import { View, Text } from 'react-native';

import HomeHeader from "../../components/HomeHeader";

import Logger from "../../../lib/utils/Logger";

import common, { COLORS } from "../../styles/common";
import styles from "./styles";

type Props = {};
export default class SignIn extends Component<Props> {

  constructor(props) {
    super(props);

    this.logger = new Logger(this);
  }

  onContext() {
    this.logger.info("Schedule context menu pressed.");
  }

  render() {
    const { mainNavigator } = this.props.screenProps;

    return (
      <View style={common.container}>
        <HomeHeader
          onMenu={mainNavigator.openDrawer}
          title="Schedule"
          contextIcon={
            {
              type: "font-awesome",
              icon: "plus",
              color: COLORS.white,
              underlayColor: "transparent",
              onPress: this.onContext.bind(this)
            }
          }
        />
      </View>
    );
  }
}
