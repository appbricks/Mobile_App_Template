/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 */
import React, { Component } from "react";
import { Alert, AlertIOS } from 'react-native';
import TouchID from "react-native-touch-id";

import prompt from 'react-native-prompt-android';

import Logger from "../../../lib/utils/Logger";

import {
  USER_NEEDS_AUTH,
  USER_LOGGED_OUT
} from "../../../lib/authentication/Session";
import { initAuthStore } from "../../redux/reducers/auth"

import {
  loadAuthState,
  resetUser,
  signInUser,
  signOutUser,
  updateAvatar
} from "../../redux/actions/creators"

import {
  AUTH_NO_MFA,
  AUTH_MFA_SMS,
  AUTH_MFA_TOTP
} from "../../../lib/authentication/Session";

import { IS_IOS } from "../../styles/common";

export default class AuthComponent<P> extends Component<P> {

  /**
   * @param {*} name          the component name
   * @param {*} props         react component properties
   * @param {*} authRequired  indicates if the component which extends 
   *                          this component requires authentication
   */
  constructor(name, props: P, authRequired = true) {
    super(props);

    if (typeof AuthComponent.initialized == 'undefined') {
      AuthComponent.initialized = false;
    }

    this.name = name;
    this.logger = new Logger(name);

    this.authRequired = authRequired;
  }

  async componentDidMount() {

    if (!AuthComponent.initialized) {

      const {
        user,
        loadAuthState,
        updateAvatar
      } = this.props;

      // Wait until all applications persistence
      // stores have initialized.
      await initAuthStore(user);

      loadAuthState();
      updateAvatar(user);

      AuthComponent.initialized = true;
      this.setState({});
    }
  }

  componentDidUpdate() {

    if (AuthComponent.initialized) {

      const {
        user,
        resetUser,
        screenProps
      } = this.props;
      const {
        ready,
        setReady,
        signedIn,
        session
      } = screenProps;

      this.logger.trace(
        "authentication state: signed in =", signedIn,
        ", ready =", ready);

      if (signedIn) {

        switch (session.validateUser(user)) {
          case USER_NEEDS_AUTH:
            this._authenticateLoggedInUser();
            break;
          case USER_LOGGED_OUT:
            if (ready) {
              this.validateNavigationState(false);
            }
            break;
          default:
            if (ready) {
              this.validateNavigationState(true);
            }
        }
      }
      else if (ready) {

        if (user.isValid()) {
          resetUser();
        }
        this.validateNavigationState(false);
      }
    }
  }

  /**
   * Navigate to an authenticated screen. This would 
   * be a no-op if the current screen is the valid 
   * authenticated screen for the current app state.
   * 
   * @param {*} isSignedIn 
   */
  validateNavigationState(isSignedIn) {

    if (this.authRequired && !isSignedIn) {

      const {
        session
      } = this.props.screenProps;

      session.validateSession();
    }
  }

  navigateToAccountVerificationScreen() {
    this.logger.trace("no-op on call to navigate to account verification screen");
  }

  onSignIn() {

    // Delegate signing to HOC
    const {
      user,
      signInUser,
      resetUser,
      screenProps
    } = this.props;
    const {
      session
    } = screenProps;

    session.signIn(user,

      (challange) => {
        this.logger.trace("Challenge for user '" + user.username + "': ", challange);

        if (challange == AUTH_MFA_SMS) {
          this._showMFAChallenge("Please enter the multi-factor authentication code you received via SMS.")
        } else {
          signInUser(user);
          this.validateNavigationState(true);
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

          this.navigateToAccountVerificationScreen();

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
    const {
      user,
      signOutUser,
      screenProps
    } = this.props;
    const {
      session
    } = screenProps;

    session.signOut(
      // On success navigate back to AuthLoading screen
      () => {
        signOutUser();
        this.logger.info("User '" + user.username + "' has signed out.")
      }
    );
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
      screenProps
    } = this.props;
    const {
      session
    } = screenProps;

    session.signInMFA(user, code,

      () => {
        this.logger.trace("Successfully validated MFA code for user '" + user.username + "'.");

        signInUser(user);
        this.validateNavigationState(true);
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
      user,
      timestamp,
      resetUser,
      screenProps
    } = this.props;
    const {
      setReady
    } = screenProps;

    if (user.isTimedout(timestamp)) {

      if (user.enableBiometric) {

        TouchID.authenticate("Resume logged-in session.")
          .then(success => {
            this.onSignIn();
          })
          .catch(error => {
            this.logger.error("biometric authentication error: ", error);
            this.onSignOut();
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
    signInUser: (user) => dispatch(signInUser(user)),
    signOutUser: () => dispatch(signOutUser()),
    resetUser: () => dispatch(resetUser()),
    updateAvatar: (user) => dispatch(updateAvatar(user)),
  }, map);
};
