/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 */
import React, { Component } from "react";
import { Alert, AlertIOS } from 'react-native';

import prompt from 'react-native-prompt-android';

import Logger from "../../../lib/utils/Logger";

import { IS_IOS } from "../../styles/common";

import {
  AUTH_NO_MFA,
  AUTH_MFA_SMS,
  AUTH_MFA_TOTP
} from "../../../lib/authentication/Auth";

type Props = {};
export default class AuthBase extends Component<Props> {

  constructor(props) {
    super(props);

    this.logger = new Logger(this);
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
              this.onValidateMFACode(code);
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
              this.onValidateMFACode(code);
            }
          },
        ],
        { type: "numeric" }
      );
    }
  }

  onValidateMFACode(code) {

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
}
