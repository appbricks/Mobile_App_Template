/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 */
import React, { Component } from "react";
import { View, Text } from 'react-native';

import { connect } from "react-redux";
import { signOutUser } from "../../redux/actions/creators"

import Logger from "../../../lib/utils/Logger";

import common from "../../styles/common"
import styles from "./styles"

type Props = {};
class SignOut extends Component<Props> {

  constructor(props) {
    super(props);

    this.logger = new Logger(this);
  }

  componentDidMount() {

    // Delegate signing to HOC
    const { user, signOutUser, screenProps } = this.props;
    const { appNavigator, onSignOut } = screenProps;

    onSignOut(
      // On success navigate back to AuthLoading screen
      () => {
        signOutUser();
        this.logger.info("User '" + user.username + "' has signed out.")
      }
    );

    appNavigator.navigate("AuthLoading");
  }

  render() {
    Logger.logRender(this);

    return (
      <View style={common.container}><Text style={common.bigText}>Sign Out</Text></View>
    );
  }
}

// **** Integration with redux store ****

const mapStateToProps = state => {
  return {
    user: state.auth.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signOutUser: () => dispatch(signOutUser())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignOut);
