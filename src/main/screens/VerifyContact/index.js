/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 */
import React, { Component } from "react";
import { View } from 'react-native';
import { Icon, Input, Button } from "react-native-elements";

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
class VerifyContact extends Component<Props> {

  constructor(props) {
    super(props);
  }

  _validateInput() {

    const { user } = this.props;

    // inputValid = (
    //   user.isValid()
    // );

    // if (this.state.inputValid != inputValid) {
    //   this.setState({ inputValid: inputValid })
    // }
  }

  render() {
    const { user, verifyType, screenProps } = this.props;
    const { backgroundImage } = this.props.screenProps;

    let sendIcon = (<View />);

    switch (verifyType) {
      case "emailAddress":

        sendIcon = (<Icon
          type="material-icons"
          name="mail-outline"
          size={DIALOG.widgetIconSize}
          color={COLORS.white}
        />);

        break;
      case "mobilePhone":

        sendIcon = (<Icon
          type="material-icons"
          name="sms"
          size={DIALOG.widgetIconSize}
          color={COLORS.white}
        />);
        break;
      default:

    }
    let iconType = (verifyType)

    return (
      <StackView
        blurBackground
        backgroundImage={backgroundImage}>

        <CardView
          title="Verification"
          style={{
            height: 170,
            borderRadius: 5,
          }} >

          <View style={[dialogStyles.row, { marginTop: 20 }]}>
            <Input
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

              labelStyle={[dialogStyles.textLabel, { textAlign: "center" }]}
              inputStyle={[dialogStyles.textInput, dialogStyles.smsInput]}

            // onChangeText={this.onChangeVerificationCode.bind(this)}
            // onEndEditing={this.onSetVerificationCode.bind(this)}
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
            // onPress={this.onCancel.bind(this)}
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
            // disabled={this.state.verifyButtonDisabled}
            // onPress={this.onVerify.bind(this)}
            />
          </View>

        </CardView>

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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyContact);

