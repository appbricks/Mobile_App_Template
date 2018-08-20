/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 */
import React from "react";
import { View, Text, Alert, AlertIOS } from 'react-native';
import { Icon, Input, Button } from "react-native-elements";

import prompt from 'react-native-prompt-android';

import { connect } from "react-redux";

import AuthComponent, {
  mapAuthStateToProps,
  mapAuthDispatchToProps
} from "../../components/AuthComponent";
import Dialog from "../../components/Dialog";
import IconButtonGroup from "../../components/IconButtonGroup";

import Logger from "../../../lib/utils/Logger";

import common, { COLORS, IS_IOS } from "../../styles/common";
import dialogStyles, { DIALOG } from "../../components/Dialog/dialogStyles";

import styles from "./styles";

const authTypeIcons = [
  {
    iconType: "font-awesome",
    iconName: "user",
    iconColor: COLORS.darkBrown,
    label: "Use your RAS username"
  },
  {
    iconType: "font-awesome",
    iconName: "google",
    iconColor: COLORS.google,
    label: "Use your Google identity"
  },
  {
    iconType: "font-awesome",
    iconName: "linkedin",
    iconColor: COLORS.linkedin,
    label: "Use your LinkedIn login"
  },
  {
    iconType: "font-awesome",
    iconName: "twitter",
    iconColor: COLORS.twitter,
    label: "Use your Twitter login"
  },
  {
    iconType: "font-awesome",
    iconName: "facebook",
    iconColor: COLORS.facebook,
    label: "Use your Facebook login"
  },
];

type Props = {};
class SignIn extends AuthComponent<props> {

  constructor(props) {
    super(props, false);

    this.state = {
      authType: 0,
      signInDisabled: true,
      signUpDisabled: false
    };
  }

  onSetUsername(text) {
    this.props.user.username = text;
    this._disableSignInCheck();
  }

  onSetPassword(text) {
    this.props.user.password = text;
    this._disableSignInCheck();
  }

  _disableSignInCheck() {

    const { user } = this.props;

    disable = (
      user.username.length == 0 ||
      user.password.length == 0 ||
      this.state.authType > 0
    );

    if (disable != this.state.signInDisabled) {
      this.setState({ signInDisabled: disable })
    }
  }

  onAuthTypeSelection(index) {

    const { user } = this.props;

    this.setState({
      authType: index,
      signInDisabled: (
        user.username.length == 0 ||
        user.password.length == 0 ||
        index > 0
      ),
      signUpDisabled: index > 0
    });
  }

  onPromptInvitation() {

    this.onSignUp();

    // if (IS_IOS) {
    //   AlertIOS.prompt(
    //     "Invitation Code",
    //     "You need an invitation code in order to  be able to sign-up",
    //     [
    //       { text: "Cancel", style: "cancel" },
    //       {
    //         text: 'Submit', style: "default",
    //         onPress: () => {
    //           // Need to validate invitation code here
    //           this.onSignUp();
    //         }
    //       },
    //     ],
    //     "plain-text", "", "number-pad"
    //   );

    // } else {

    //   prompt(
    //     "Invitation Code",
    //     "You need an invitation code in order to  be able to sign-up",
    //     [
    //       { text: "Cancel", style: "cancel" },
    //       {
    //         text: 'Submit', style: "default",
    //         onPress: () => {
    //           // Need to validate invitation code here
    //           this.onSignUp();
    //         }
    //       },
    //     ],
    //     { type: "numeric" }
    //   );
    // }
  }

  onPasswordReset() {

    const {
      user,
      navigation,
      screenProps
    } = this.props;

    const { session } = screenProps;

    if (user.username.length > 0) {

      session.resetPassword(user,
        () => {
          this.props.navigation.navigate("PasswordReset");
        },
        (error) => {

          if (error == "invalidLogin") {

            Alert.alert(
              "Unknown User",
              "Unable to find the user for which a password reset is requested.",
              [
                { text: 'OK' }
              ],
              { cancelable: true }
            );

          } else if (error == "notVerified") {

            Alert.alert(
              "Phone Number Not Verified",
              "Phone number needs to be verified before " +
              "a password reset request can be initiated." +
              "\n\nPlease contact Rent-a-Space customer support.",
              [
                { text: 'OK' }
              ],
              { cancelable: true }
            );

          } else {

            Alert.alert(
              "Password Reset Failed",
              "There was a problem initiating a password reset.\n\n\"" + error + "\"",
              [
                { text: 'OK' }
              ],
              { cancelable: true }
            );
          }
        });

    } else {

      Alert.alert(
        "Username Empty",
        "Please enter the name of the user whose password needs to be reset.",
        [
          { text: 'OK' }
        ],
        { cancelable: true }
      );
    }
  }

  onSignUp() {
    this.props.navigation.navigate("SignUp");
  }

  render() {
    const { user, screenProps } = this.props;
    const { ready } = screenProps;

    return (
      <Dialog showLoading={!ready}>

        <View style={[dialogStyles.row, { marginTop: 70 }]}>
          <Input
            label="Username"
            placeholder="please enter your username"
            rightIcon={
              <Icon
                type="font-awesome"
                name="user-o"
                size={DIALOG.widgetIconSize}
                color={COLORS.darkBrown}
              />}
            autoCapitalize="none"
            autoCorrect={false}
            spellCheck={false}
            textContentType="username"
            returnKeyType="done"

            containerStyle={dialogStyles.textContainer}
            labelStyle={dialogStyles.textLabel}
            inputStyle={dialogStyles.textInput}

            value={user.username}
            onChangeText={this.onSetUsername.bind(this)}
          />
        </View>

        <View style={[dialogStyles.row, { marginTop: 20 }]}>
          <Input
            label="Password"
            placeholder="please enter your password"
            rightIcon={
              <Icon
                type="font-awesome"
                name="key"
                size={DIALOG.widgetIconSize}
                color={COLORS.darkBrown}
              />}
            secureTextEntry={true}
            textContentType="password"
            returnKeyType="done"

            containerStyle={dialogStyles.textContainer}
            labelStyle={dialogStyles.textLabel}
            inputStyle={dialogStyles.textInput}

            value={user.password}
            onChangeText={this.onSetPassword.bind(this)}
          />
        </View>

        <View style={[dialogStyles.row, { marginTop: 20 }]}>
          <Text style={[dialogStyles.legalText]}>
            Please <Text style={common.hyperLink}
              onPress={this.onPasswordReset.bind(this)}
            >
              reset
            </Text> my password
          </Text>
        </View>

        <View style={[dialogStyles.row, { marginTop: 15 }]}>
          <IconButtonGroup
            iconSize={DIALOG.widgetIconSize}
            icons={authTypeIcons}
            selectedIndex={this.state.authType}
            onPress={this.onAuthTypeSelection.bind(this)}
            buttonStyle={{ paddingTop: 10 }}
            selectedButtonStyle={{ backgroundColor: COLORS.darkBrown }}
            containerStyle={{ flex: 1, height: 40 }} />
        </View>
        <View style={dialogStyles.row}>
          <Text style={[styles.socialLabel, { color: authTypeIcons[this.state.authType].iconColor }]}>
            {authTypeIcons[this.state.authType].label}
          </Text>
        </View>

        <View style={[dialogStyles.row, dialogStyles.alignBottom]}>
          <Button
            icon={
              <Icon
                type="font-awesome"
                name="sign-in"
                size={DIALOG.widgetIconSize}
                color={COLORS.white} />
            }
            titleStyle={dialogStyles.buttonTitle}
            buttonStyle={dialogStyles.button}
            title="Sign In"
            disabledStyle={dialogStyles.disabledButton}
            disabled={this.state.signInDisabled}
            onPress={super.onSignIn.bind(this)}
          />
          <Button
            icon={
              <Icon
                type="font-awesome"
                name="pencil-square-o"
                size={DIALOG.widgetIconSize}
                color={COLORS.white} />
            }
            titleStyle={dialogStyles.buttonTitle}
            buttonStyle={[dialogStyles.button, dialogStyles.nextButton]}
            title="Sign Up"
            disabledStyle={dialogStyles.disabledButton}
            disabled={this.state.signUpDisabled}
            onPress={this.onPromptInvitation.bind(this)}
          />
        </View>

      </Dialog >
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

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);