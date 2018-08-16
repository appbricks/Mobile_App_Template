/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 */
import React, { Component } from "react";
import { View, Text, Alert } from 'react-native';
import { Icon, Input, Button } from "react-native-elements";

import { COLORS } from "../../styles/common"
import styles, { TEXT_INPUT_CONTEXT } from "./styles";

type Props = {};
export default class TextInput extends Component<Props> {

  constructor(props) {
    super(props);

    this.inputRef = null;

    this.state = {
      hasFocus: false,
      message: null
    }
  }

  componentDidMount() {

    const { value, validateInput } = this.props;
    if (validateInput) {
      this._validateInput(value || "");
    }
  }

  _setFocus() {
    this.setState({ hasFocus: true });
  }

  _resetFocus() {

    const { value, validateInput, resetIfInvalid } = this.props;

    if (this.state.message && resetIfInvalid) {

      // Reset the text input to the initial
      // value of the input field if the current 
      // input is not valid

      if (validateInput) {
        this._validateInput(value || "");
      }

      // Hack to reset the value in the input field
      setTimeout(() => {
        this.inputRef.input.setNativeProps({ text: "" });
      });
      setTimeout(() => {
        this.inputRef.input.setNativeProps({ text: value });
      });
    }

    this.setState({ hasFocus: false });
  }

  _validateInput(data) {

    currMessage = this.state.message;
    newMessage = this.props.validateInput(data);

    if (!currMessage && newMessage) {
      this.setState({ message: newMessage });

    } else if (currMessage && newMessage) {

      if (currMessage.shortMessage != newMessage.shortMessage
        || currMessage.longMessage != newMessage.longMessage) {

        this.setState({ message: newMessage });
      }

    } else if (currMessage) {
      this.setState({ message: null });
    }
  }

  _showContextButton() {

    const { contextButton } = this.props;

    if (!this.state.hasFocus
      && contextButton
      && contextButton.show) {

      return (
        <Button
          iconRight
          icon={
            <Icon
              type={contextButton.iconType}
              name={contextButton.iconName}
              size={TEXT_INPUT_CONTEXT.iconSize}
              color={contextButton.color} />
          }
          titleStyle={styles.buttonTitle}
          buttonStyle={[styles.button, { backgroundColor: contextButton.background }]}
          disabledStyle={styles.disabledButton}
          containerStyle={{
            position: "absolute",
            top: 0,
            right: 10,
          }}
          title={contextButton.title}
          disabled={contextButton.disabled}
          onPress={contextButton.onPress
            ? contextButton.onPress.bind(this)
            : () => { }}
        />
      );
    }
  }

  _showBadge() {

    if (this.state.hasFocus
      && this.state.message
      && this.state.message.shortMessage) {

      return (
        <Text
          style={[
            styles.textInputBadge,
            {
              top: 0,
              right: 10
            }
          ]}
        >
          {this.state.message.shortMessage}
        </Text>
      );
    }
  }

  _showMessage() {

    if (this.state.message && this.state.message.longMessage) {
      Alert.alert(
        "Validation Error",
        this.state.message.longMessage,
        [
          { text: 'OK' }
        ],
        { cancelable: true }
      )
    }
  }

  render() {

    const {
      validateInput,
      style,
      leftIcon,
      rightIcon,
      onFocus,
      onEndEditing,
      onChangeText,
      ...otherProps
    } = this.props;

    return (
      <View style={style}>
        <Input
          ref={ref => this.inputRef = ref}
          leftIcon={leftIcon && leftIcon.type ?
            (<Icon
              onPress={this._showMessage.bind(this)}
              type={leftIcon.type}
              name={leftIcon.name}
              size={leftIcon.size}
              color={this.state.message && this.state.message.longMessage
                ? COLORS.red : leftIcon.color} />)
            : null}
          rightIcon={rightIcon && rightIcon.type ?
            (<Icon
              onPress={this._showMessage.bind(this)}
              type={rightIcon.type}
              name={rightIcon.name}
              size={rightIcon.size}
              color={this.state.message && this.state.message.longMessage
                ? COLORS.red : rightIcon.color} />)
            : null}
          onFocus={e => {

            this._setFocus();

            if (onFocus) {
              onFocus(e);
            }
          }}
          onChangeText={t => {

            if (validateInput) {
              this._validateInput(t);
            }
            if (onChangeText) {
              onChangeText(t);
            }
          }}
          onEndEditing={e => {

            this._resetFocus();

            if (onEndEditing) {
              onEndEditing(e);
            }
          }}
          {...otherProps}
        />

        {this._showContextButton()}
        {this._showBadge()}
      </View>
    );
  }
}
