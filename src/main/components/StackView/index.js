/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 */
import React, { Component } from "react";
import { View, StatusBar } from 'react-native';

import common, { THEME } from "../../styles/common";
import styles from "./styles";

type Props = {};
export default class StackView extends Component<Props> {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { backgroundImage } = this.props;
    backgroundImage.blur(THEME.stackViewImageBlur.type, THEME.stackViewImageBlur.amount);
  }

  componentWillUnmount() {
    const { backgroundImage } = this.props;
    backgroundImage.unblur();
  }

  render() {

    return (
      <View style={common.container}>
        <StatusBar barStyle={THEME.stackViewStatusBar} />
        {this.props.children}
      </View>
    )
  }
}
