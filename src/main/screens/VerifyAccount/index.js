/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 */
import React, { Component } from "react";
import { View, Text, Alert } from 'react-native';
import { Icon, Input, Button, CheckBox } from "react-native-elements";

import { connect } from "react-redux";
import { resetUser } from "../../redux/actions/creators"

import Dialog from "../../components/Dialog"
import IconButtonGroup from "../../components/IconButtonGroup"

import Logger from "../../../lib/utils/Logger";

import common, { COLORS } from "../../styles/common";
import dialogStyles, { DIALOG } from "../../components/Dialog/dialogStyles";

import styles from "./styles";

const COLOR = false;
const STYLE = true;

type Props = {};
class VerifyAccount extends Component<Props> {

  constructor(props) {
    super(props);

    this.state = {
      verificationCode: null,
      enableBiometric: false,
      enableMFA: false,
      rememberFor24h: false,
      verifyButtonDisabled: true
    }
  }

  onResendCode() {
    const { user } = this.props;
    this.props.screenProps.onResendSignUpCode(user);
  }

  onChangeVerificationCode(text) {
    disable = (text.length == 0);

    if (disable != this.state.verifyButtonDisabled) {
      this.setState({ verifyButtonDisabled: disable });
    }
  }

  onSetVerificationCode(event) {
    this.setState({ verificationCode: event.nativeEvent.text });
  }

  onEnableBiometric() {
    const { user } = this.props;

    user.enableBiometric = !this.state.enableBiometric;
    this.setState({ enableBiometric: user.enableBiometric });
  }

  onEnableMFA() {
    const { user } = this.props;

    user.enableMFA = !this.state.enableMFA;
    user.rememberFor24h = user.enableMFA && this.state.rememberFor24h;

    this.setState(
      {
        enableMFA: user.enableMFA,
        rememberFor24h: user.rememberFor24h
      }
    );
  }

  onRememberFor24h() {
    const { user } = this.props;
    user.rememberFor24h = !this.state.rememberFor24h;

    this.setState({ rememberFor24h: user.rememberFor24h });
  }

  onCancel() {
    this._navigateToSignInScreen();
  }

  onVerify() {

    // Delegate signing to HOC
    const { user, screenProps } = this.props;
    const { onSignUpVerify } = screenProps;

    onSignUpVerify(user, this.state.verificationCode,
      // On success navigate back to sign-in screen
      (user) => {
        this._navigateToSignInScreen();
      },
      (error) => {

        if (error == "invalidLogin") {

          Alert.alert(
            "Updating MFA Preference",
            "The user account was confirmed, but your MFA preference was " +
            "not updated as your password was incorrect. You can update " +
            "it from settings after logging in",
            [
              { text: 'OK' }
            ],
            { cancelable: true }
          );

        } else {

          Alert.alert(
            "Error",
            "There was a problem verifying the sign-up confirmation code.\n\n\"" + error + "\"",
            [
              { text: 'OK' }
            ],
            { cancelable: true }
          );
        }

        this._navigateToSignInScreen();
      }
    );
  }

  _navigateToSignInScreen() {
    const { resetUser, navigation } = this.props;

    resetUser();
    navigation.navigate("SignIn");
  }

  _getCheckBoxColor(style, disabled?) {

    if (style) {
      if (disabled) {
        return { color: DIALOG.checkBoxDisabledColor };
      } else {
        return { color: DIALOG.checkBoxEnabledColor };
      }

    } else {
      if (disabled) {
        return DIALOG.checkBoxDisabledColor;
      } else {
        return DIALOG.checkBoxEnabledColor;
      }
    }
  }

  render() {
    Logger.logRender(this);

    return (
      <Dialog showLoading={!this.props.screenProps.ready}>

        <View style={[dialogStyles.row, { marginTop: 55 }]}>
          <Button
            icon={
              <Icon
                type="material-icons"
                name="sms"
                size={DIALOG.widgetIconSize}
                color={COLORS.white} />
            }
            titleStyle={dialogStyles.buttonTitle}
            buttonStyle={[dialogStyles.button, dialogStyles.smsButton]}
            title="Resend Code"
            onPress={this.onResendCode.bind(this)}
          />
        </View>

        <View style={[dialogStyles.row, { marginTop: 5 }]}>
          <Input
            placeholder="enter the verification code"
            rightIcon={
              <Icon
                type="font-awesome"
                name="comment-o"
                size={DIALOG.widgetIconSize}
                color={COLORS.darkBrown}
              />}
            autoCapitalize="none"
            autoCorrect={false}
            spellCheck={false}
            keyboardType="numeric"
            textContentType="none"

            containerStyle={[dialogStyles.smsInputContainer]}
            labelStyle={[dialogStyles.textLabel, { textAlign: "center" }]}
            inputStyle={[dialogStyles.textInput, dialogStyles.smsInput]}

            onChangeText={this.onChangeVerificationCode.bind(this)}
            onEndEditing={this.onSetVerificationCode.bind(this)}
          />
        </View>

        <View style={[dialogStyles.row, dialogStyles.checkBoxRow, { marginTop: 20 }]}>
          <CheckBox
            title='Enable Biometric Authentication'
            checked={this.state.enableBiometric}
            checkedColor={DIALOG.checkBoxEnabledColor}
            uncheckedColor={DIALOG.checkBoxEnabledColor}
            textStyle={dialogStyles.checkBoxEnabled}
            containerStyle={dialogStyles.checkBoxContainer}
            onPress={this.onEnableBiometric.bind(this)}
          />
        </View>
        <View style={[dialogStyles.row, dialogStyles.checkBoxRow]}>
          <Text style={[dialogStyles.checkBoxHelpText]}>
            This will enable you to authenticate
            using thumbprint or facial recognition
          </Text>
        </View>

        <View style={[dialogStyles.row, dialogStyles.checkBoxRow, { marginTop: 5 }]}>
          <CheckBox
            title='Enable 2-Factor Authentication'
            checked={this.state.enableMFA}
            checkedColor={DIALOG.checkBoxEnabledColor}
            uncheckedColor={DIALOG.checkBoxEnabledColor}
            textStyle={dialogStyles.checkBoxEnabled}
            containerStyle={dialogStyles.checkBoxContainer}
            onPress={this.onEnableMFA.bind(this)}
          />
        </View>
        <View style={[dialogStyles.row, dialogStyles.checkBoxRow]}>
          <Text style={dialogStyles.checkBoxHelpText}>
            You will be required to enter a pin which you
            will receive via SMS each time you log in
          </Text>
        </View>

        <View style={[dialogStyles.row, dialogStyles.checkBoxRow, { marginTop: 5 }]}>
          <CheckBox
            title='Remember me for 24 hours'
            checked={this.state.rememberFor24h}
            disabled={!this.state.enableMFA}
            checkedColor={this._getCheckBoxColor(COLOR, !this.state.enableMFA)}
            uncheckedColor={this._getCheckBoxColor(COLOR, !this.state.enableMFA)}
            textStyle={this._getCheckBoxColor(STYLE, !this.state.enableMFA)}
            containerStyle={dialogStyles.checkBoxContainer}
            onPress={this.onRememberFor24h.bind(this)}
          />
        </View>
        <View style={[dialogStyles.row, dialogStyles.checkBoxRow]}>
          <Text style={dialogStyles.checkBoxHelpText}>
            Only valid if 2-Factor authentication is enabled.
            This will require you to authenticate via multi-
            factor authentication only once every 24 hours
          </Text>
        </View>

        <View style={[dialogStyles.row, dialogStyles.alignBottom]}>
          <Button
            icon={
              <Icon
                type="font-awesome"
                name="close"
                size={DIALOG.widgetIconSize}
                color={COLORS.white} />
            }
            titleStyle={dialogStyles.buttonTitle}
            buttonStyle={dialogStyles.button}
            disabledStyle={dialogStyles.disabledButton}
            title="Cancel"
            onPress={this.onCancel.bind(this)}
          />
          <Button
            icon={
              <Icon
                type="font-awesome"
                name="check-square-o"
                size={DIALOG.widgetIconSize}
                color={COLORS.white} />
            }
            titleStyle={dialogStyles.buttonTitle}
            buttonStyle={[dialogStyles.button, dialogStyles.nextButton]}
            disabledStyle={dialogStyles.disabledButton}
            title="Verify"
            disabled={this.state.verifyButtonDisabled}
            onPress={this.onVerify.bind(this)}
          />
        </View>

      </Dialog >
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
    resetUser: () => dispatch(resetUser())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyAccount);
