/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 */
import React, { Component } from "react";
import { View } from "react-native";
import { createBottomTabNavigator, SafeAreaView } from "react-navigation";
import { Icon } from "react-native-elements";

import Logger from "../../../lib/utils/Logger";

// Modified react-navigation "BottomTabBar" that does not
// display red-warnings when it is removed from navigation
// when device is in landscape. This happens as the
// "withDimensions" HOC that wraps the "react-navigation"
// "TabBarBottom" registers callbacks for Dimensions "change" 
// event which are fired after component has been removed.
import { BottomTabBar } from "../../components/Navigation";

import {
  reduxStore,
  setHomeContext
} from "../../redux";

import MyListingsNav from "../MyListingsNav";
import MySpacesNav from "../MySpacesNav";
import ScheduleNav from "../ScheduleNav";
import AlertsNav from "../AlertsNav";

import {
  THEME,
  DEVICE
} from "../../styles/common";
import styles, {
  tabStyles,
  stackStyles
} from "./styles";

const HomeNav = createBottomTabNavigator(
  {
    MyListingsNav: {
      screen: MyListingsNav,
      navigationOptions: {
        tabBarLabel: "My Listings",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type='font-awesome'
            name="newspaper-o"
            color={tintColor}
            containerStyle={tabStyles.iconStyle}
          />
        ),
        tabBarOnPress: ({ navigation, defaultHandler }) => {
          DEVICE.unlockAllOrientations();
          defaultHandler();
        }
      }
    },
    MySpacesNav: {
      screen: MySpacesNav,
      navigationOptions: {
        tabBarLabel: "My Spaces",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type='font-awesome'
            name="building-o"
            color={tintColor}
            containerStyle={tabStyles.iconStyle}
          />
        ),
        tabBarOnPress: ({ navigation, defaultHandler }) => {
          DEVICE.unlockAllOrientations();
          defaultHandler();
        }
      }
    },
    ScheduleNav: {
      screen: ScheduleNav,
      navigationOptions: {
        tabBarLabel: "Schedule",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type='font-awesome'
            name="calendar"
            color={tintColor}
            containerStyle={tabStyles.iconStyle}
          />
        ),
        tabBarOnPress: ({ navigation, defaultHandler }) => {
          DEVICE.lockToPortrait();
          defaultHandler();
        }
      }
    },
    AlertsNav: {
      screen: AlertsNav,
      navigationOptions: {
        tabBarLabel: "Alerts",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type='font-awesome'
            name="bell-o"
            color={tintColor}
            containerStyle={tabStyles.iconStyle}
          />
        ),
        tabBarOnPress: ({ navigation, defaultHandler }) => {
          DEVICE.unlockAllOrientations();
          defaultHandler();
        }
      }
    }
  },
  {
    initialRouteName: "MyListingsNav",
    tabBarComponent: props => {

      type Props = {};
      const C = class extends Component<Props> {
        constructor(props) {
          super(props);
        }
        render() {
          if (DEVICE.orientation === "LANDSCAPE") {
            return (
              <SafeAreaView
                style={{ backgroundColor: THEME.tabBarBackground }}
              />
            );

          } else {
            return (
              <BottomTabBar
                adaptive={false}
                {...this.props}
                style={styles.tabBarStyle}
              />
            );
          }
        }
      }

      return <C {...props} />
    }
    ,
    tabBarOptions: {
      activeTintColor: tabStyles.activeTintColor,
      activeBackgroundColor: tabStyles.activeBackgroundColor,
      inactiveTintColor: tabStyles.inactiveTintColor,
      inactiveBackgroundColor: tabStyles.inactiveBackgroundColor,
      labelStyle: tabStyles.textStyle,
      tabStyle: tabStyles.inactiveTabStyle
    }
  }
);

export default DEVICE.orientationAware(HomeNav);

// Stack navigation helpers

/**
 * 
 * @param {*} title    title of stack
 * @param {*} context  context icon and route given by { type, name, route }
 */
export function stackFirstHeader(title, context?) {

  return ({ navigation, screenProps }) => {

    switch (title) {
      case "My Listings":
        reduxStore.dispatch(setHomeContext("listings"));
        break;
      case "My Spaces":
        reduxStore.dispatch(setHomeContext("spaces"));
        break;
      case "Schedule":
        reduxStore.dispatch(setHomeContext("schedule"));
        break;
      case "Alerts":
        reduxStore.dispatch(setHomeContext("alerts"));
        break;
    }

    let options = {
      headerTransparent: true,
      headerStyle: stackStyles.header,
      headerTitleStyle: stackStyles.headerTitle,
      headerBackTitleStyle: stackStyles.headerBackTitle,
      title: title
    };

    if (DEVICE.isOrientationPotrait()) {
      options = Object.assign(options, {
        headerLeft: (
          <Icon
            type="font-awesome"
            name="bars"
            color={stackStyles.headerIconColor}
            underlayColor="transparent"
            containerStyle={styles.stackHeaderIcon}
            onPress={screenProps.mainNavigator.openDrawer}
          />
        )
      });
    } else {
      setTimeout(() => screenProps.mainNavigator.closeDrawer());
    }
    if (context) {
      options = Object.assign(options, {
        headerRight: (
          <Icon
            type={context.iconType}
            name={context.iconName}
            color={stackStyles.headerIconColor}
            underlayColor="transparent"
            containerStyle={styles.stackHeaderIcon}
            onPress={() => {

              Logger.trace(
                "stackFirstHeader",
                "navigating to context route: ",
                context.route)

              navigation.navigate(context.route)
            }}
          />
        )
      })
    }
    return options;
  };
}

/**
 * 
 * @param {*} title 
 */
export function stackHeader(title) {

  return ({ navigation }) => {

    return {
      headerTransparent: true,
      headerStyle: stackStyles.header,
      headerTitleStyle: stackStyles.headerTitle,
      headerBackTitleStyle: stackStyles.headerBackTitle,
      headerLeft: (props) => {

        const { onPress, title, titleStyle } = props;

        return (
          <View style={styles.stackHeaderBackStyle}>
            <Icon
              type="font-awesome"
              name="angle-double-left"
              color={stackStyles.headerIconColor}
              underlayColor="transparent"
              containerStyle={styles.stackHeaderIcon}
              onPress={() => onPress()}
            />

            <TouchableHighlight
              underlayColor="transparent"
              onPress={() => onPress()}>

              <Text style={styles.stackHeaderBackTitleStyle}>{title}</Text>
            </TouchableHighlight>

          </View>
        )
      },
      title: title
    };
  };
}
