/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 */
import React, { Component } from "react";
import { View, Text } from 'react-native';
import { Badge } from "react-native-elements";

import { connect } from "react-redux";

import AuthComponent, {
  mapAuthStateToProps,
  mapAuthDispatchToProps
} from "../../components/AuthComponent";

import StackView from "../../components/StackView";
import CardView from "../../components/CardView";

import Logger from "../../../lib/utils/Logger";

import { TRANSPARENT } from "../../components/CardView/styles";
import { THEME } from "../../styles/common";
import styles from "./styles";

type Props = {};
class MyListings extends AuthComponent<Props> {

  constructor(props) {
    super("MyListings", props);
  }

  onContext() {
    super.logger.info("My listing context menu pressed.");
  }

  render() {
    const { backgroundImage } = this.props.screenProps;

    let data = [];
    for (i = 0; i < 10; i++) {
      data.push({
        value: i
      })
    }

    return (
      <StackView
        backgroundImage={backgroundImage}>

        {data.map(d => (

          <CardView
            key={"MyListing_" + d.value}
            style={THEME.homeCardStyleTransparent}>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                height: 100,
              }}>

              <Text
                style={{
                  paddingRight: 10,
                  color: THEME.color,
                  fontFamily: "Lato-Bold",
                  fontSize: 20
                }}
              >
                My Listing
              </Text>

              <Badge
                value={d.value}
                containerStyle={{
                  backgroundColor: THEME.color
                }}
                textStyle={{
                  fontFamily: "Lato-Bold",
                  fontSize: 20,
                  color: THEME.cardBackground
                }}
              />

            </View>

          </CardView>
        ))}

      </StackView>
    );
  }
}

// **** Integration with redux store ****

const mapStateToProps = state => {
  return mapAuthStateToProps(state, {});
};

const mapDispatchToProps = dispatch => {
  return mapAuthDispatchToProps(dispatch, {});
};

export default connect(mapStateToProps, mapDispatchToProps)(MyListings);
