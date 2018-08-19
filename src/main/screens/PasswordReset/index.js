/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 */
import React, { Component } from "react";
import { View, Alert } from 'react-native';
import { Icon, Input, Button } from "react-native-elements";

import { connect } from "react-redux";
import { resetUser } from "../../redux/actions/creators"

import Dialog from "../../components/Dialog"
import TextInput from "../../components/TextInput"

import Logger from "../../../lib/utils/Logger";

import common, { COLORS } from "../../styles/common";
import dialogStyles, { DIALOG } from "../../components/Dialog/dialogStyles";

import styles from "./styles";

const COLOR = false;
const STYLE = true;

type Props = {};
class PasswordReset extends Component<Props> {

  constructor(props) {
    super(props);

    this.resetCode = "";
    this.verifiedPassword = "";

    this.state = {
      resetButtonDisabled: true
    }
  }

  onChangeVerificationCode(text) {
    this.resetCode = text;
    this._validateInput();
  }

  onSetVerificationCode(event) {
    this.setState({ resetCode: event.nativeEvent.text });
  }

  onCancel() {
    this._navigateToSignInScreen();
  }

  onReset() {

    const {
      user,
      screenProps
    } = this.props;

    const { session } = screenProps;

    session.updatePassword(user, this.resetCode,
      // On success navigate back to sign-in screen
      (user) => {
        this._navigateToSignInScreen();
      },
      (error) => {

        Alert.alert(
          "Error",
          "There was a problem resetting the password for user '" +
          user.username + "'.\n\n\"" + error + "\"",
          [
            { text: 'OK' }
          ],
          { cancelable: true }
        );

        this._navigateToSignInScreen();
      }
    );
  }

  _navigateToSignInScreen() {
    const { resetUser, navigation } = this.props;

    resetUser();
    navigation.navigate("SignIn");
  }

  _validateInput() {

    const { user } = this.props;
    unverifiedPassword = user.password;

    enableResetButton = (
      this.resetCode.length > 0 &&
      unverifiedPassword.length > 0 &&
      unverifiedPassword == this.verifiedPassword
    );

    if (this.state.enableResetButton != enableResetButton) {
      this.setState({ resetButtonDisabled: !enableResetButton })
    }
  }

  render() {
    const { user } = this.props;

    return (
      <Dialog showLoading={!this.props.screenProps.ready}>

        <View style={[dialogStyles.row, { marginTop: 55 }]}>
          <Input
            label="Password Reset Code"
            placeholder="please enter the reset code"
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

        <View style={[dialogStyles.row, { marginTop: 25 }]}>
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

            containerStyle={dialogStyles.textContainer}
            labelStyle={dialogStyles.textLabel}
            inputStyle={dialogStyles.textInput}
            editable={false}

            value={user.username}
          />
        </View>

        <TextInput
          style={[dialogStyles.row, { marginTop: 10 }]}

          label="New Password"
          placeholder="enter your password"
          rightIcon={{
            type: "font-awesome",
            name: "key",
            size: DIALOG.widgetIconSize,
            color: COLORS.darkBrown,
          }}
          secureTextEntry={true}
          textContentType="password"

          containerStyle={dialogStyles.textContainer}
          labelStyle={dialogStyles.textLabel}
          inputContainerStyle={styles.textInputContainer}
          inputStyle={[dialogStyles.textInput, styles.textInput]}

          validateInput={(data) => {
            msg = user.validatePassword(data);
            this._validateInput();
            return msg;
          }}
        />

        <TextInput
          style={[dialogStyles.row, { marginTop: 10 }]}

          label="Verify Password"
          placeholder="re-enter your password"
          rightIcon={{
            type: "font-awesome",
            name: "key",
            size: DIALOG.widgetIconSize,
            color: COLORS.darkBrown
          }}
          secureTextEntry={true}
          textContentType="password"

          containerStyle={dialogStyles.textContainer}
          labelStyle={dialogStyles.textLabel}
          inputContainerStyle={styles.textInputContainer}
          inputStyle={[dialogStyles.textInput, styles.textInput]}

          validateInput={(data) => {
            msg = user.verifyPassword(data);
            this.verifiedPassword = data;
            this._validateInput();
            return msg;
          }}
        />

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
            title="Reset"
            disabled={this.state.resetButtonDisabled}
            onPress={this.onReset.bind(this)}
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

export default connect(mapStateToProps, mapDispatchToProps)(PasswordReset);
