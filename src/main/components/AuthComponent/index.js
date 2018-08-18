/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 */
import React, { Component } from "react";
import { Alert, AlertIOS } from 'react-native';
import TouchID from "react-native-touch-id";

import prompt from 'react-native-prompt-android';

import {
  USER_UNDEFINED,
  USER_NEEDS_AUTH
} from "../../../lib/authentication/Auth";
import { initAuthStore } from "../../redux/reducers/auth"

import Logger from "../../../lib/utils/Logger";

import { IS_IOS } from "../../styles/common";

import {
  AUTH_NO_MFA,
  AUTH_MFA_SMS,
  AUTH_MFA_TOTP
} from "../../../lib/authentication/Auth";

import {
  loadAuthState,
  resetUser,
  signInUser,
  signOutUser
} from "../../redux/actions/creators"

export default class AuthComponent<P> extends Component<P> {

  constructor(props: P) {
    super(props);

    if (typeof AuthComponent.initialized == 'undefined') {
      AuthComponent.initialized = false;
    }

    this.logger = new Logger(this);
  }

  async componentDidMount() {

    if (!AuthComponent.initialized) {

      const { user, loadAuthState } = this.props;

      // Wait until all applications persistence
      // stores have initialized.
      await initAuthStore(user);
      loadAuthState();

      AuthComponent.initialized = true;
      this.setState({});
    }
  }

  componentDidUpdate() {

    if (AuthComponent.initialized) {

      const { user, resetUser, screenProps } = this.props;
      const { ready, setReady, signedIn, validateUser } = screenProps;

      this.logger.trace(
        "authentication state: signed in =", signedIn,
        ", ready =", ready);

      if (signedIn) {

        switch (validateUser(user)) {
          case USER_UNDEFINED:
            this.navigateToSignInScreen();
            break;
          case USER_NEEDS_AUTH:
            this._authenticateLoggedInUser();
            break;
          default:
            if (ready) {
              this.navigateToMainScreen();
            }
        }
      }
      else if (ready) {

        if (user.isValid()) {
          resetUser();
        }
        this.navigateToSignInScreen();
      }
    }
  }

  onSignIn() {

    // Delegate signing to HOC
    const {
      user,
      signInUser,
      resetUser,
      navigation,
      screenProps
    } = this.props;

    const { onSignIn } = screenProps;

    onSignIn(user,

      (challange) => {
        this.logger.trace("Challenge for user '" + user.username + "': ", challange);

        if (challange == AUTH_MFA_SMS) {
          this._showMFAChallenge("Please enter the multi-factor authentication code you received via SMS.")
        } else {
          signInUser();
          navigation.navigate("AuthLoading");
        }
      },
      (error) => {

        if (error == "notConfirmed") {

          Alert.alert(
            "User Not Confirmed",
            "You need to confirm your account using the code that was sent to you.",
            [
              { text: 'OK' }
            ],
            { cancelable: true }
          );

          this.props.navigation.navigate("VerifyAccount");

        } else {
          Alert.alert(
            "Sign-In Failed",
            (error == "invalidLogin"
              ? "The user name or password you entered is incorrect."
              : "There was a problem signing.\n\n\"" + error + "\""),
            [
              { text: 'OK' }
            ],
            { cancelable: true }
          );

          resetUser();
        }
      }
    );
  }

  onSignOut() {

    // Delegate signing to HOC
    const { user, signOutUser, screenProps } = this.props;
    const { onSignOut } = screenProps;

    onSignOut(
      // On success navigate back to AuthLoading screen
      () => {
        signOutUser();
        this.logger.info("User '" + user.username + "' has signed out.")
      }
    );
  }

  navigateToSignInScreen() {
    this.logger.trace("no-op on call to navigate to sign in screen");
  }

  navigateToMainScreen() {
    this.logger.trace("no-op on call to navigate to main screen");
  }

  _showMFAChallenge(message) {

    if (IS_IOS) {
      AlertIOS.prompt(
        "Authentication Code", message,
        [
          {
            text: "Cancel", style: "cancel",
            onPress: () => {
              this.props.resetUser();
            }
          },
          {
            text: 'Submit', style: "default",
            onPress: (code) => {
              this._validateMFACode(code);
            }
          },
        ],
        "plain-text", "", "number-pad"
      );

    } else {

      prompt(
        "Authentication Code", message,
        [
          {
            text: "Cancel", style: "cancel",
            onPress: () => {
              this.props.resetUser();
            }
          },
          {
            text: 'Submit', style: "default",
            onPress: (code) => {
              this._validateMFACode(code);
            }
          },
        ],
        { type: "numeric" }
      );
    }
  }

  _validateMFACode(code) {

    // Delegate signing to HOC
    const {
      user,
      signInUser,
      resetUser,
      navigation,
      screenProps
    } = this.props;

    const { onSignInMFA } = screenProps;

    onSignInMFA(user, code,

      () => {
        this.logger.trace("Successfully validated MFA code for user '" + user.username + "'.");

        signInUser();
        navigation.navigate("AuthLoading");
      },
      (error) => {

        if (error == "invalidCode") {

          Alert.alert(
            "Authentication Failed",
            "The multi-factor authentication code you entered is not valid.",
            [
              { text: 'OK' }
            ],
            { cancelable: true }
          );

        } else {
          Alert.alert(
            "Authentication Failed",
            "There was a problem authenticating.\n\n\"" + error + "\"",
            [
              { text: 'OK' }
            ],
            { cancelable: true }
          );
        }

        resetUser();
      });
  }

  async _authenticateLoggedInUser() {

    const {
      navigation,
      user,
      timestamp,
      resetUser,
      screenProps
    } = this.props;

    const { setReady } = screenProps;

    if (user.isTimedout(timestamp)) {

      if (user.enableBiometric) {

        TouchID.authenticate("Resume logged-in session.")
          .then(success => {
            this.onSignIn();
          })
          .catch(error => {
            this.logger.error("biometric authentication error: ", error);
            resetUser();
          });

      } else if (user.enableMFA) {
        this.onSignIn();

      } else {
        this.logger.trace("signing out of timed out log-in session");
        this.onSignOut();
      }

    } else {
      this.logger.trace("resuming logged-in session");
      setReady();
    }
  }
}

// **** auth redux store state and dispatch mappings ****

export function mapAuthStateToProps(state, map) {

  return Object.assign({
    user: state.auth.user,
    timestamp: state.auth.timestamp
  }, map);
};

export function mapAuthDispatchToProps(dispatch, map) {

  return Object.assign({
    loadAuthState: () => dispatch(loadAuthState()),
    signInUser: () => dispatch(signInUser()),
    signOutUser: () => dispatch(signOutUser()),
    resetUser: () => dispatch(resetUser())
  }, map);
};