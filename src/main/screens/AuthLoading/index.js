/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 */
import React from "react";
import { View, StatusBar, Alert } from 'react-native';
import TouchID from "react-native-touch-id";

import {
  RESET_AUTH,
  USER_NEEDS_AUTH
} from "../../../lib/authentication/Auth";

import { connect } from "react-redux";
import { loadAuthState, signInUser, resetUser } from "../../redux/actions/creators"

import AuthBase from "../../components/AuthBase";
import LoadingView from "../../components/LoadingView";

import Logger from "../../../lib/utils/Logger";

import { initAuthStore } from "../../redux/reducers/auth"

import common, { COLORS } from "../../styles/common";
import styles from "./styles";

class AuthLoading extends AuthBase {

  constructor(props) {
    super(props);

    this.logger = new Logger(this);
  }

  async componentDidMount() {

    const { user, loadAuthState } = this.props;

    // Wait until all applications persistence
    // stores have initialized.
    await initAuthStore(user);
    loadAuthState();
  }

  componentDidUpdate() {

    const { user, resetUser, screenProps } = this.props;
    const { ready, signedIn, validateUser } = screenProps;

    this.logger.trace(
      "authentication state: signed in =", signedIn,
      ", ready =", ready);

    if (signedIn) {

      if (validateUser(user) == USER_NEEDS_AUTH) {
        this._authenticateLoggedInUser();
      } else if (ready) {
        this.props.navigation.navigate("Main");
      }
    }
    else if (ready) {
      this.props.navigation.navigate("SignIn");
    }
  }

  async _authenticateLoggedInUser() {

    const { navigation, user, resetUser, screenProps } = this.props;
    const { setReady } = screenProps;

    if (user.enableBiometric) {

      TouchID.authenticate("Resume logged-in session.")
        .then(success => {

          this._doSignIn();
          this.logger.trace("logged in user: ", user);
        })
        .catch(error => {
          this.logger.error("biometric authentication error: ", error);
          resetUser();
        });

    } else {
      this._doSignIn();
    }
  }

  _doSignIn() {

    const { user, timestamp, screenProps } = this.props;
    const { setReady } = screenProps;

    if (user.isTimedout(timestamp)) {
      this.onSignIn();
    } else {
      setReady();
    }
  }

  render() {
    Logger.logRender(this);

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
  return {
    user: state.auth.user,
    timestamp: state.auth.timestamp
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadAuthState: () => dispatch(loadAuthState()),
    signInUser: () => dispatch(signInUser()),
    resetUser: () => dispatch(resetUser())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoading);
