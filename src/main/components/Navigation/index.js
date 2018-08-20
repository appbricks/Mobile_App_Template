/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 */
import React, { Component } from "react";
import { View } from 'react-native';

import LoadingView from "../LoadingView";
import DrawerItems from "./DrawerNavigatorItems";

type Props = {};

/**
 * Returns a child navigation component within
 * within a drawer navigator component. It contains
 * a LoadingView embedded that will show whenever 
 * the "screenProps.ready" flag is false. It also
 * provides "screenProps.navigateNext" function
 * that will lock the drawer before navigating to
 * the next screen.
 * 
 * @param {*} C 
 */
function drawerChildNav(Nav) {

  return (

    class extends Component<Props> {

      static router = Nav.router;

      constructor(props) {
        super(props);
      }

      render() {

        const {
          navigation,
          screenProps
        } = this.props;

        screenProps.navigateNext = (route) => {
          screenProps.drawerLockMode = "locked-closed";
          navigation.navigate(route);
        }

        return (
          <View style={{ flex: 1 }}>

            <Nav
              navigation={navigation}
              screenProps={{ ...screenProps }} />

            <LoadingView show={!screenProps.ready} />

          </View>
        );
      }
    }
  );
}

/**
 * Placeholder screen for a separator to 
 * show in a Drawer Navigator component,
 */
const Seperator = {
  screen: (props) => <View />,
  navigationOptions: {
    drawerLabel: "---"
  }
};

export {
  DrawerItems,
  Seperator,
  drawerChildNav
}
