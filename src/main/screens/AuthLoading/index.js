/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 */
import React from "react";
import { View, StatusBar, Alert } from 'react-native';

import { connect } from "react-redux";

import AuthComponent, {
  mapAuthStateToProps,
  mapAuthDispatchToProps
} from "../../components/AuthComponent";
import LoadingView from "../../components/LoadingView";

import Logger from "../../../lib/utils/Logger";

import common, { COLORS } from "../../styles/common";
import styles from "./styles";

type Props = {};
class AuthLoading extends AuthComponent<props> {

  constructor(props) {
    super(props);

    this.logger = new Logger("AuthLoading");
  }

  navigateToSignInScreen() {
    this.props.navigation.navigate("SignIn");
  }

  navigateToMainScreen() {
    this.props.navigation.navigate("Main");
  }

  render() {
    const { ready } = this.props.screenProps;

    return (
      <View style={common.container}>
        <StatusBar barStyle="light-content" />
        <LoadingView show={!ready} />
      </View>
    );
  }

}

// **** Integration with redux store ****

const mapStateToProps = state => {
  return mapAuthStateToProps(state, {});
};

const mapDispatchToProps = dispatch => {
  return mapAuthDispatchToProps(dispatch, {});
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoading);
