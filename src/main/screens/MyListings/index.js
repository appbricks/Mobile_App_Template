/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 */
import React, { Component } from "react";
import { View, Text } from 'react-native';

import { connect } from "react-redux";

import AuthComponent, {
  mapAuthStateToProps,
  mapAuthDispatchToProps
} from "../../components/AuthComponent";
import LoadingView from "../../components/LoadingView";
import HomeHeader from "../../components/HomeHeader";

import Logger from "../../../lib/utils/Logger";

import common, { COLORS } from "../../styles/common";
import styles from "./styles";

type Props = {};
class MyListings extends AuthComponent<Props> {

  constructor(props) {
    super(props);

    this.logger = new Logger(this);
  }

  onContext() {
    this.logger.info("My listing context menu pressed.");
  }

  render() {
    const { ready, mainNavigator } = this.props.screenProps;

    return (
      <View style={common.container}>
        <LoadingView show={!ready} />
        <HomeHeader
          onMenu={mainNavigator.openDrawer}
          title="My Listings"
          contextIcon={
            {
              type: "font-awesome",
              icon: "plus",
              color: COLORS.white,
              underlayColor: "transparent",
              onPress: this.onContext.bind(this)
            }
          }
        />
      </View>
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
