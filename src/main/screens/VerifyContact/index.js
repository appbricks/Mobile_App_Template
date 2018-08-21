/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 */
import React, { Component } from "react";
import { View, Text } from 'react-native';
import { Icon, Input, Button } from "react-native-elements";

import { connect } from "react-redux";

import AuthComponent, {
  mapAuthStateToProps,
  mapAuthDispatchToProps
} from "../../components/AuthComponent";

import {
  ATTRIB_EMAIL_ADDRESS,
  ATTRIB_MOBILE_PHONE
} from "../../../lib/authentication/Session"

import {
  updateUser
} from "../../redux/actions/creators"

import StackView from "../../components/StackView";
import CardView from "../../components/CardView";
import TextInput from "../../components/TextInput"

import Logger from "../../../lib/utils/Logger";

import common, {
  COLORS
} from "../../styles/common";
import dialogStyles, {
  DIALOG
} from "../../components/Dialog/dialogStyles";
import styles from "./styles";

type Props = {};
class VerifyContact extends AuthComponent<Props> {

  constructor(props) {
    super("VerifyAccount", props);

    this.state = {
      verificationCode: null,
      verifyButtonDisabled: true
    }
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

  onSendCode(type) {

    const {
      verifyType,
      screenProps
    } = this.props;
    const {
      session
    } = screenProps;

    switch (verifyType) {
      case "emailAddress":
        session.verifyAttribute(ATTRIB_EMAIL_ADDRESS);
        break;

      case "mobilePhone":
        session.verifyAttribute(ATTRIB_MOBILE_PHONE);
        break;
    }
  }

  onVerifyCode() {

    const {
      navigation,
      verifyType,
      user,
      updateUser,
      screenProps
    } = this.props;
    const { session } = screenProps;

    switch (verifyType) {
      case "emailAddress":
        session.confirmAttribute(ATTRIB_EMAIL_ADDRESS, this.state.verificationCode,
          () => {
            user.emailAddressVerified = true;
            updateUser(user);
            navigation.goBack();
          }
        );
        break;

      case "mobilePhone":
        session.confirmAttribute(ATTRIB_MOBILE_PHONE, this.state.verificationCode,
          () => {
            user.mobilePhoneVerified = true;
            updateUser(user);
            navigation.goBack();
          }
        );
        break;
    }
  }

  render() {
    const { user, verifyType } = this.props;

    let sendIcon = (<View />);
    let message;

    switch (verifyType) {
      case "emailAddress":

        message = "Please enter the code that was sent to your email address \"" +
          user.emailAddress + "\"."

        sendIcon = (<Icon
          type="material-icons"
          name="mail-outline"
          size={DIALOG.widgetIconSize}
          color={COLORS.white}
        />);
        break;

      case "mobilePhone":

        message = "Please enter the code that was texted to your mobile phone \"" +
          user.mobilePhone + "\"."

        sendIcon = (<Icon
          type="material-icons"
          name="sms"
          size={DIALOG.widgetIconSize}
          color={COLORS.white}
        />);
        break;
    }
    let iconType = (verifyType)

    return (
      <StackView>

        <CardView
          title="Verification"
          style={{
            height: 235,
            borderRadius: 5,
          }} >

          <View style={[dialogStyles.row, { marginTop: 30 }]}>
            <Input
              label={message}
              placeholder="enter the verification code"
              rightIcon={<Icon
                type="material-community"
                name="numeric"
                size={DIALOG.widgetIconSize}
                color={COLORS.darkBrown}
              />}
              autoCapitalize="none"
              autoCorrect={false}
              spellCheck={false}
              keyboardType="numeric"
              textContentType="none"

              // containerStyle={dialogStyles.textContainer}
              labelStyle={[dialogStyles.textLabel, { paddingBottom: 10, textAlign: "justify" }]}
              inputStyle={[dialogStyles.textInput, dialogStyles.smsInput]}

              onChangeText={this.onChangeVerificationCode.bind(this)}
              onEndEditing={this.onSetVerificationCode.bind(this)}
            />
          </View>

          <View style={[dialogStyles.row, { marginTop: 25 }]}>
            <Button
              icon={sendIcon}
              titleStyle={dialogStyles.buttonTitle}
              buttonStyle={[
                dialogStyles.button
              ]}
              disabledStyle={dialogStyles.disabledButton}
              title="Send"
              onPress={this.onSendCode.bind(this)}
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
              buttonStyle={[
                dialogStyles.button,
                dialogStyles.nextButton
              ]}
              disabledStyle={dialogStyles.disabledButton}
              title="Verify"
              disabled={this.state.verifyButtonDisabled}
              onPress={this.onVerifyCode.bind(this)}
            />
          </View>

        </CardView>

      </StackView >
    );
  }
}

// **** Integration with redux store ****

const mapStateToProps = state => {
  return mapAuthStateToProps(state, {});
};

const mapDispatchToProps = dispatch => {
  return mapAuthDispatchToProps(dispatch, {
    updateUser: (user) => dispatch(updateUser(user))
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyContact);

