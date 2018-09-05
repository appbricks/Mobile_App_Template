/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 */
import React, { Component } from "react";
import { View, Text, Linking } from 'react-native';
import { Icon, Button, Badge } from "react-native-elements";

import { connect } from "react-redux";
import { resetUser } from "../../redux";

import Dialog from "../../components/Dialog"
import TextInput from "../../components/TextInput"

import Logger from "../../../lib/utils/Logger";

import {
  TERMS_OF_SERVICE_LINK,
  PRIVACY_POLICY_LINK
} from "../../Legal"

import common, {
  COLORS
} from "../../styles/common"
import dialogStyles, {
  DIALOG
} from "../../components/Dialog/dialogStyles"

import styles from "./styles"

type Props = {};
class SignUp extends Component<Props> {

  constructor(props) {
    super(props);

    this.logger = new Logger("SignUp");

    this.verifiedPassword = "";

    this.state = {
      inputValid: false
    }
  }

  onCancel() {

    const { resetUser, navigation } = this.props;

    resetUser();
    navigation.navigate("SignIn");
  }

  onSignUp() {

    // Delegate signing to HOC
    const { user, screenProps } = this.props;
    const { session } = screenProps;

    session.signUp(user,

      (userConfirmed) => {

        if (!userConfirmed) {
          this.props.navigation.navigate("VerifyAccount");
        } else {
          this.props.navigation.navigate("SignIn");
        }
      }
    );
  }

  _validateInput() {

    const { user } = this.props;
    unverifiedPassword = user.password;

    inputValid = (
      user.isValid() &&
      unverifiedPassword.length > 0 &&
      unverifiedPassword == this.verifiedPassword
    );

    if (this.state.inputValid != inputValid) {
      this.setState({ inputValid: inputValid })
    }
  }

  render() {
    const { user, screenProps } = this.props;
    const { ready } = screenProps;

    return (
      <Dialog showLoading={!ready}>

        <TextInput
          style={[dialogStyles.row, { marginTop: 30 }]}

          label="Username"
          placeholder="enter your username"
          rightIcon={{
            type: "font-awesome",
            name: "user-o",
            size: DIALOG.widgetIconSize,
            color: COLORS.darkBrown
          }}
          autoCapitalize="none"
          autoCorrect={false}
          spellCheck={false}
          textContentType="username"

          containerStyle={dialogStyles.textContainer}
          labelStyle={dialogStyles.textLabel}
          inputContainerStyle={styles.textInputContainer}
          inputStyle={[dialogStyles.textInput, styles.textInput]}

          validateInput={(data) => {
            msg = user.validateUsername(data);
            this._validateInput();
            return msg;
          }}
        />

        <TextInput
          style={[dialogStyles.row, { marginTop: 10 }]}

          label="Password"
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
            this.verifiedPassword = data;
            msg = user.verifyPassword(data);
            this._validateInput();
            return msg;
          }}
        />

        <TextInput
          style={[dialogStyles.row, { marginTop: 10 }]}

          label="Email Address"
          placeholder="enter a valid email"
          rightIcon={{
            type: "entypo",
            name: "email",
            size: DIALOG.widgetIconSize,
            color: COLORS.darkBrown
          }}
          autoCapitalize="none"
          autoCorrect={false}
          spellCheck={false}
          keyboardType="email-address"
          textContentType="emailAddress"

          containerStyle={dialogStyles.textContainer}
          labelStyle={dialogStyles.textLabel}
          inputContainerStyle={styles.textInputContainer}
          inputStyle={[dialogStyles.textInput, styles.textInput]}

          validateInput={(data) => {
            msg = user.validateEmailAddress(data);
            this._validateInput();
            return msg;
          }}
        />

        <TextInput
          style={[dialogStyles.row, { marginTop: 10 }]}

          label="Mobile Telephone Number"
          placeholder="enter a valid phone"
          rightIcon={{
            type: "entypo",
            name: "mobile",
            size: DIALOG.widgetIconSize,
            color: COLORS.darkBrown
          }}
          autoCapitalize="none"
          autoCorrect={false}
          spellCheck={false}
          keyboardType="phone-pad"
          textContentType="telephoneNumber"

          containerStyle={dialogStyles.textContainer}
          labelStyle={dialogStyles.textLabel}
          inputContainerStyle={styles.textInputContainer}
          inputStyle={[dialogStyles.textInput, styles.textInput]}

          validateInput={(data) => {
            msg = user.validateMobilePhone(data);
            this._validateInput();
            return msg;
          }}
        />

        <View style={[dialogStyles.row, { marginTop: 10 }]}>
          <Text style={[dialogStyles.legalText, styles.legalText]}>
            By signing up, you agree with our <Text style={common.hyperLink}
              onPress={() => {
                Linking.openURL(TERMS_OF_SERVICE_LINK).catch(error => console.warn('Linking error: ', error));
              }}
            >
              Terms of Service
            </Text> and <Text style={common.hyperLink}
              onPress={() => {
                Linking.openURL(PRIVACY_POLICY_LINK).catch(error => console.warn('Linking error: ', error));
              }}
            >
              Privacy Policy
            </Text>
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
            title="Sign Up"
            disabled={!this.state.inputValid}
            onPress={this.onSignUp.bind(this)}
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
