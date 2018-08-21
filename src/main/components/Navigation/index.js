/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 */
import React, { Component } from "react";
import { Easing, Animated, View } from 'react-native';

import LoadingView from "../LoadingView";
import DrawerItems from "./DrawerNavigatorItems";

type Props = {};

/**
 * Placeholder route config for a separator 
 * to show within the items in a Drawer Navigator 
 * component,
 */
const Seperator = {
  screen: (props) => <View />,
  navigationOptions: {
    drawerLabel: "---"
  }
};

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

        if (navigation.state.routes.length > 1) {
          screenProps.drawerLockMode = "locked-closed"
        } else {
          screenProps.drawerLockMode = "unlocked"
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
 * Returns a standard StackNavigatorConfig with
 * the given route as the initial route. This
 * configuration also enables a transparent 
 * background and smoother animation of the 
 * stack cards.
 * 
 * @param {*} initialRouteName 
 */
export function stackNavigatorConfig(initialRouteName) {

  return {
    initialRouteName: initialRouteName,
    headerMode: "screen",
    cardStyle: {
      backgroundColor: "transparent"
    },
    navigationOptions: props => ({
      gesturesEnabled: true
    }),
    transitionConfig: () => ({
      containerStyle: {
      },
      transitionSpec: {
        duration: 500,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
      },
      screenInterpolator: sceneProps => {
        const { layout, position, scene } = sceneProps;
        const { index } = scene;
        const width = layout.initWidth;

        return {
          opacity: position.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0, 1, 0],
          }),
          transform: [{
            translateX: position.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [width, 0, -width],
            }),
          }]
        };
      },
    }),
  };
}

export {
  DrawerItems,
  Seperator,
  drawerChildNav
}
