/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 */
import React, { Component } from "react";
import { Header } from "react-native-elements";

import common, { COLORS } from "../../styles/common"
import styles from "./styles";

type Props = {};
export default class HomeHeader extends Component<Props> {

  constructor(props) {
    super(props);
  }

  render() {

    const { onMenu, contextIcon } = this.props;

    if (contextIcon) {
      return (
        <Header
          outerContainerStyles={styles.outerContainer}
          leftComponent={
            {
              type: "font-awesome",
              icon: "bars",
              color: COLORS.white,
              underlayColor: "transparent",
              onPress: onMenu
            }
          }
          centerComponent={
            { text: this.props.title, style: styles.textStyle }
          }
          rightComponent={contextIcon}
        />
      );
    } else {
      return (
        <Header
          outerContainerStyles={styles.outerContainer}
          leftComponent={
            {
              type: "font-awesome",
              icon: "bars",
              color: COLORS.white,
              underlayColor: "transparent",
              onPress: onMenu
            }
          }
          centerComponent={
            { text: this.props.title, style: styles.textStyle }
          }
        />
      );
    }
  }
}
