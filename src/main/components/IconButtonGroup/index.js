/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 */
import React, { Component } from "react";
import { View } from "react-native";
import { Icon } from "react-native-elements";

import { COLORS } from "../../styles/common"
import styles from "./styles";

type Props = {};

export default class IconButtonGroup extends Component<Props> {

  constructor(props) {
    super(props)

    this.state = {
      selectedIndex: this.props.selectedIndex
    };
  }

  _selectButton(index) {

    const { onPress } = this.props;

    onPress(index);
    this.setState({ selectedIndex: index })
  }

  render() {

    const {
      icons,
      iconSize,
      buttonDirection
    } = this.props;

    let buttons = [];
    for (i = 0; i < icons.length; ++i) {

      const iconComponent = (icon, index) => {
        return (<Icon
          key={i}
          size={iconSize}
          type={icon.iconType}
          name={icon.iconName}
          raised={true}
          color={icon.iconColor}
          reverseColor={COLORS.white}
          reverse={this.state.selectedIndex == index}
          onPress={() => {
            this._selectButton(index)
          }}
        />)
      }
      buttons.push(iconComponent(icons[i], i))
    }

    return (
      <View style={
        (buttonDirection && buttonDirection == "column"
          ? styles.columnOfButtons
          : styles.rowOfButtons
        )}>
        {buttons}
      </View >
    )
  }
}
