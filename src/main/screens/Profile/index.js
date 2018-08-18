/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 */
import React, { Component } from "react";
import { View, Text } from 'react-native';
import { Icon, Input, CheckBox, Button } from "react-native-elements";

import { connect } from "react-redux";

import StackView from "../../components/StackView";
import CardView from "../../components/CardView";
import TextInput from "../../components/TextInput"

import Logger from "../../../lib/utils/Logger";

import common, {
  COLORS,
  THEME
} from "../../styles/common";
import dialogStyles, {
  DIALOG,
  getCheckBoxColor
} from "../../components/Dialog/dialogStyles";
import styles from "./styles";

const COLOR = false;
const STYLE = true;

type Props = {};
class Profile extends Component<Props> {

  constructor(props) {
    super(props);

    this.emailAddressInputRef = null;
    this.mobilePhoneInputRef = null;

    this.state = {
      emailAddress: null,
      emailAddressVerified: null,
      emailAddressDirty: false,
      mobilePhone: null,
      mobilePhoneVerified: null,
      mobilePhoneDirty: false,
      contactInfoUpdated: false
    }
  }

  componentDidMount() {

    const { user } = this.props;

    this.setState({
      emailAddress: user.emailAddress,
      emailAddressVerified: user.emailAddressVerified,
      mobilePhone: user.mobilePhone,
      mobilePhoneVerified: user.mobilePhoneVerified
    })
  }

  onEnableBiometric() {
    const { user } = this.props;

    user.enableBiometric = !user.enableBiometric;
    this._saveUserLoginPrefs();
  }

  onEnableMFA() {
    const { user } = this.props;

    user.enableMFA = !user.enableMFA;
    this._saveUserLoginPrefs();
  }

  onRememberFor24h() {
    const { user } = this.props;

    user.rememberFor24h = !user.rememberFor24h;
    this._saveUserLoginPrefs();
  }

  onResetContactInfo() {

    const { user } = this.props;

    this.setState({
      emailAddress: user.emailAddress,
      emailAddressVerified: user.emailAddressVerified,
      emailAddressDirty: false,
      mobilePhone: user.mobilePhone,
      mobilePhoneVerified: user.mobilePhoneVerified,
      mobilePhoneDirty: false,
      contactInfoUpdated: false
    });
  }

  onSaveUserContactInfo() {

    const { user } = this.props;

    user.emailAddress = this.state.emailAddress;
    user.emailAddressVerified = this.state.emailAddressVerified;
    user.mobilePhone = this.state.mobilePhone;
    user.mobilePhoneVerified = this.state.mobilePhoneVerified;

    // TBD

    this.onResetContactInfo();
  }

  _saveUserLoginPrefs() {
    const { user } = this.props;
    this.setState({});
  }

  _validateEmailAddressInput(emailAddress) {

    const { user } = this.props;
    msg = user.validateEmailAddress(emailAddress, false);

    this.setState({
      contactInfoUpdated:
        (emailAddress != user.emailAddress) ||
        this.state.mobilePhoneDirty
    })

    return msg;
  }

  _onEmailAddressUpdate(emailAddress) {

    const { user } = this.props;
    if (!user.validateEmailAddress(emailAddress, false)) {

      emailAddressDirty = (user.emailAddress != emailAddress);

      this.setState({
        emailAddress: emailAddress,
        emailAddressVerified: !emailAddressDirty && user.emailAddressVerified,
        emailAddressDirty: emailAddressDirty
      });
    }
  }

  _validateMobilePhoneInput(mobilePhone) {

    const { user } = this.props;
    msg = user.validateMobilePhone(mobilePhone, false);

    this.setState({
      contactInfoUpdated:
        (mobilePhone != user.mobilePhone) ||
        this.state.emailAddressDirty
    })

    return msg;
  }

  _onMobilePhoneUpdate(mobilePhone) {

    const { user } = this.props;
    if (!user.validateMobilePhone(mobilePhone, false)) {

      mobilePhoneDirty = (user.mobilePhone != mobilePhone);

      this.setState({
        mobilePhone: mobilePhone,
        mobilePhoneVerified: !mobilePhoneDirty && user.mobilePhoneVerified,
        mobilePhoneDirty: mobilePhoneDirty
      });
    }
  }

  render() {
    const { user, screenProps } = this.props;
    const { backgroundImage } = this.props.screenProps;

    return (
      <StackView
        blurBackground
        backgroundImage={backgroundImage}>

        <CardView
          title="Login"
          style={{
            height: 300,
            borderRadius: 5,
          }} >

          <View style={[dialogStyles.row, { marginTop: 15 }]}>
            <Input
              label="Username"
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

          <View style={[dialogStyles.row, dialogStyles.checkBoxRow, { marginTop: 10 }]}>
            <CheckBox
              title='Enable Biometric Authentication'
              checked={user.enableBiometric}
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
              checked={user.enableMFA}
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
              checked={user.rememberFor24h}
              checkedColor={DIALOG.checkBoxEnabledColor}
              uncheckedColor={DIALOG.checkBoxEnabledColor}
              textStyle={dialogStyles.checkBoxEnabled}
              containerStyle={dialogStyles.checkBoxContainer}
              onPress={this.onRememberFor24h.bind(this)}
            />
          </View>
          <View style={[dialogStyles.row, dialogStyles.checkBoxRow]}>
            <Text style={dialogStyles.checkBoxHelpText}>
              This will require you to re-authenticate only once
              every 24 hours as long as you do not sign-out
            </Text>
          </View>

        </CardView>

        <CardView
          title="Contact"
          style={{
            height: 240,
            borderRadius: 5,
          }} >

          {this.state.emailAddress ? (

            <TextInput
              ref={ref => this.emailAddressInputRef = ref}
              style={[dialogStyles.row, { marginTop: 15 }]}

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

              contextButton={{
                show:
                  this.state.emailAddressDirty
                  || !this.state.emailAddressVerified,
                title: "Verify",
                iconType: "font-awesome",
                iconName: "angle-double-right",
                color: THEME.cardBackground,
                background: THEME.contextButtonColor,
                disabled: this.state.emailAddressDirty,
                onPress: () => this.props.navigation.navigate("VerifyEmailAddress"),
              }}

              value={this.state.emailAddress}
              validateInput={(data) => this._validateEmailAddressInput(data)}
              onEndEditing={(event) => this._onEmailAddressUpdate(event.nativeEvent.text)}
              resetIfInvalid
            />
          ) : false}

          {this.state.mobilePhone ? (

            <TextInput
              ref={ref => this.mobilePhoneInputRef = ref}
              style={[dialogStyles.row, { marginTop: 5 }]}

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

              contextButton={{
                show:
                  this.state.mobilePhoneDirty
                  || !this.state.mobilePhoneVerified,
                title: "Verify",
                iconType: "font-awesome",
                iconName: "angle-double-right",
                color: THEME.cardBackground,
                background: THEME.contextButtonColor,
                disabled: this.state.mobilePhoneDirty,
                onPress: () => this.props.navigation.navigate("VerifyMobilePhone"),
              }}

              value={this.state.mobilePhone}
              validateInput={(data) => this._validateMobilePhoneInput(data)}
              onEndEditing={(event) => this._onMobilePhoneUpdate(event.nativeEvent.text)}
              resetIfInvalid
            />
          ) : false}

          <View style={[dialogStyles.row, { marginTop: 17 }]}>
            <Button
              icon={<Icon
                type="font-awesome"
                name="undo"
                size={DIALOG.widgetIconSize}
                color={COLORS.white} />
              }
              titleStyle={dialogStyles.buttonTitle}
              buttonStyle={[
                dialogStyles.button,
                styles.button
              ]}
              disabledStyle={dialogStyles.disabledButton}
              title="Reset"
              disabled={!this.state.contactInfoUpdated}
              onPress={this.onResetContactInfo.bind(this)}
            />
            <Button
              icon={
                <Icon
                  type="font-awesome"
                  name="save"
                  size={DIALOG.widgetIconSize}
                  color={COLORS.white} />
              }
              titleStyle={dialogStyles.buttonTitle}
              buttonStyle={[
                dialogStyles.button,
                dialogStyles.nextButton,
                styles.button
              ]}
              disabledStyle={dialogStyles.disabledButton}
              title="Save"
              disabled={!this.state.contactInfoUpdated}
              onPress={this.onSaveUserContactInfo.bind(this)}
            />
          </View>

        </CardView>

        {/* <CardView
          title="Avatar"
          style={{
            height: 200,
            borderRadius: 5,
          }} >

        </CardView> */}

      </StackView>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

