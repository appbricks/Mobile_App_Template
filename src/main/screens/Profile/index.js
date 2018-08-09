/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 */
import React, { Component } from "react";
import { Text } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import { withAuthCheck } from "../../../lib/authentication/Auth";

import { stackFirstHeader, stackNavigatorConfig } from "../../navigation/MainNav";
import StackView from "../../components/StackView";

import Logger from "../../../lib/utils/Logger";

import common, { COLORS } from "../../styles/common";
import styles from "./styles";

type Props = {};
class Profile extends Component<Props> {

  constructor(props) {
    super(props);
  }

  _onMenu() {
    const { navigation } = this.props;
    navigation.openDrawer
  }

  render() {
    Logger.logRender(this);

    const { backgroundImage } = this.props.screenProps;

    return (
      <StackView backgroundImage={backgroundImage}>
        <Text style={common.bigText}>Profile Screen...</Text>
      </StackView>
    );
  }
}

const ProfileNav = createStackNavigator(
  {
    Profile: {
      screen: withAuthCheck("appNavigator", "AuthLoading", Profile),
      navigationOptions: stackFirstHeader("Profile")
    }
  },
  stackNavigatorConfig("Profile")
);

export default ProfileNav;