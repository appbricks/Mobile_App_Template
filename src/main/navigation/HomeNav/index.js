/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 */
import React, { Component } from "react";
import { createBottomTabNavigator } from 'react-navigation';
import { BottomTabBar } from 'react-navigation-tabs';
import { Icon } from "react-native-elements";

import Logger from "../../../lib/utils/Logger";

import MyListingsNav from "../MyListingsNav";
import MySpacesNav from "../MySpacesNav";
import ScheduleNav from "../ScheduleNav";
import AlertsNav from "../AlertsNav";

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
        )
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
        )
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
        )
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
        )
      }
    }
  },
  {
    initialRouteName: "MyListingsNav",
    tabBarComponent: props => {

      const C = class extends Component {
        constructor(props) {
          super(props);
        }

        render() {

          return (
            <BottomTabBar
              adaptive={false}
              {...this.props}
              style={styles.tabBarStyle}
            />);
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

export default HomeNav;

// Stack navigation helpers

/**
 * 
 * @param {*} title    title of stack
 * @param {*} context  context icon and route given by { type, name, route }
 */
export function stackFirstHeader(title, context?) {

  return ({ navigation, screenProps }) => {

    let options = {
      headerTransparent: true,
      headerStyle: stackStyles.header,
      headerTitleStyle: stackStyles.headerTitle,
      headerBackTitleStyle: stackStyles.headerBackTitle,
      headerLeft: (
        <Icon
          type="font-awesome"
          name="bars"
          color={stackStyles.headerIconColor}
          underlayColor="transparent"
          containerStyle={styles.stackHeaderIcon}
          onPress={screenProps.mainNavigator.openDrawer}
        />
      ),
      title: title
    };

    if (context) {

      return Object.assign(options, {
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
    } else {
      return options;
    }
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
