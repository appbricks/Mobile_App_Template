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
      mobilePhone: null,
      mobilePhoneVerified: null
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

    this._saveUser();
  }

  onEnableMFA() {
    const { user } = this.props;

    user.enableMFA = !user.enableMFA;
    user.rememberFor24h = user.enableMFA && user.rememberFor24h;

    this._saveUser();
  }

  onRememberFor24h() {
    const { user } = this.props;
    user.rememberFor24h = !user.rememberFor24h;

    this._saveUser();
  }

  _saveUser() {
    const { user } = this.props;
    this.setState({});
  }

  render() {
    Logger.logRender(this);

    const { user, screenProps } = this.props;
    const { backgroundImage } = this.props.screenProps;

    return (
      <StackView
        blurBackground
        backgroundImage={backgroundImage}>

        <CardView
          title="Login"
          style={{
            height: 310,
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
              disabled={!user.enableMFA}
              checkedColor={getCheckBoxColor(COLOR, !user.enableMFA)}
              uncheckedColor={getCheckBoxColor(COLOR, !user.enableMFA)}
              textStyle={getCheckBoxColor(STYLE, !user.enableMFA)}
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
                  (user.emailAddress != this.state.emailAddress)
                  || !this.state.emailAddressVerified,
                title: "Verify",
                iconType: "font-awesome",
                iconName: "angle-double-right",
                color: THEME.cardBackground,
                background: THEME.contextButtonColor,
                disabled: (user.emailAddress != this.state.emailAddress),
                onPress: () => this.props.navigation.navigate("VerifyEmailAddress"),
              }}

              value={this.state.emailAddress}
              validateInput={(data) => {
                msg = user.validateEmailAddress(data, false);
                return msg;
              }}

              onEndEditing={(event) => {
                data = event.nativeEvent.text;

                if (!user.validateEmailAddress(data, false)) {
                  this.setState({
                    emailAddress: data,
                    emailAddressVerified:
                      (user.emailAddress != data)
                      || user.emailAddressVerified
                  });
                }
              }}

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
                  (user.mobilePhone != this.state.mobilePhone)
                  || !this.state.mobilePhoneVerified,
                title: "Verify",
                iconType: "font-awesome",
                iconName: "angle-double-right",
                color: THEME.cardBackground,
                background: THEME.contextButtonColor,
                disabled: (user.mobilePhone != this.state.mobilePhone),
                onPress: () => this.props.navigation.navigate("VerifyMobilePhone"),
              }}

              value={this.state.mobilePhone}
              validateInput={(data) => {
                msg = user.validateMobilePhone(data, false);
                return msg;
              }}

              onEndEditing={(event) => {
                data = event.nativeEvent.text;

                if (!user.validateMobilePhone(data, false)) {
                  this.setState({
                    mobilePhone: data,
                    mobilePhoneVerified:
                      (user.mobilePhone != data)
                      || user.mobilePhoneVerified
                  });
                }
              }}

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
            // onPress={this.onCancel.bind(this)}
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
            // disabled={this.state.verifyButtonDisabled}
            // onPress={this.onVerify.bind(this)}
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

