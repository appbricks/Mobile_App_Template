/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 */
import React, { Component } from "react";
import { View, Text } from 'react-native';

import common, { COLORS, THEME } from "../../styles/common";
import styles from "./styles";

type Props = {};
export default class CardView extends Component<Props> {

  constructor(props) {
    super(props);
  }

  render() {

    const {
      style,
      ...props
    } = this.props;

    if (this.addChildRef) {

      return (
        <View
          ref={this.addChildRef}
          onLayout={({ nativeEvent }) => this.addChildLayout(nativeEvent.layout)}
          style={[styles.container, styles.outerContainer, style]}
          {...props}
        >
          <View style={[styles.container, styles.sectionBorder]}>
            {this.props.children}
          </View>

          <Text style={styles.sectionTitle}>
            {this.props.title}
          </Text>

        </View>
      )
    } else {

      return (
        <View
          style={[styles.container, styles.outerContainer, style]}
          {...props}
        >
          <View style={[styles.container, styles.sectionBorder]}>
            {this.props.children}
          </View>

          <Text style={styles.sectionTitle}>
            {this.props.title}
          </Text>

        </View>
      )
    }
  }
}
