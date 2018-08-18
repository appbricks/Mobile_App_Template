/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 */
import React, { Component } from "react";
import { createBottomTabNavigator } from 'react-navigation';
import { Icon } from "react-native-elements";

import MyListings from "../../screens/MyListings";
import MySpaces from "../../screens/MySpaces";
import Schedule from "../../screens/Schedule";
import Alerts from "../../screens/Alerts";

import styles, { tabStyles } from "./styles";

const HomeNav = createBottomTabNavigator(
  {
    MyListings: {
      screen: MyListings,
      navigationOptions: {
        tabBarLabel: "My Listings",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type='font-awesome'
            name="newspaper-o"
            color={tintColor}
            containerStyle={tabStyles.iconStyle}
          />
        )
      }
    },
    MySpaces: {
      screen: MySpaces,
      navigationOptions: {
        tabBarLabel: "My Spaces",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type='font-awesome'
            name="building-o"
            color={tintColor}
            containerStyle={tabStyles.iconStyle}
          />
        )
      }
    },
    Schedule: {
      screen: Schedule,
      navigationOptions: {
        tabBarLabel: "Schedule",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type='font-awesome'
            name="calendar"
            color={tintColor}
            containerStyle={tabStyles.iconStyle}
          />
        )
      }
    },
    Alerts: {
      screen: Alerts,
      navigationOptions: {
        tabBarLabel: "Alerts",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type='font-awesome'
            name="bell-o"
            color={tintColor}
            containerStyle={tabStyles.iconStyle}
          />
        )
      }
    }
  },
  {
    initialRouteName: "MyListings",
    tabBarOptions: {
      activeTintColor: tabStyles.activeTintColor,
      activeBackgroundColor: tabStyles.activeBackgroundColor,
      inactiveTintColor: tabStyles.inactiveTintColor,
      inactiveBackgroundColor: tabStyles.inactiveBackgroundColor,
      style: tabStyles.tabBarStyle,
      labelStyle: tabStyles.textStyle
    }
  }
);

export default HomeNav;