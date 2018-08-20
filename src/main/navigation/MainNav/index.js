/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 */
import React, { Component } from "react";
import {
  Easing,
  Animated,
  View,
  ScrollView,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Text
} from "react-native";

import {
  createDrawerNavigator,
  SafeAreaView
} from 'react-navigation';
import { Icon } from "react-native-elements";

import {
  DrawerItems,
  Seperator,
  navWithLoadingOverlay
} from "../../components/Navigation";

import AvatarView from "../../components/AvatarView";

import HomeNav from "../HomeNav";
import ProfileNav from "../ProfileNav";
import Account from "../../screens/Account";
import Settings from "../../screens/Settings";
import Help from "../../screens/Help";
import SignOut from "../../screens/SignOut";

import common, {
  COLORS,
  THEME
} from "../../styles/common";
import styles, {
  drawerStyles,
  stackStyles
} from "./styles";

const MainNav = createDrawerNavigator(
  {
    Home: {
      screen: (props) => {

        const {
          navigation,
          screenProps
        } = props;

        return (<HomeNav screenProps={
          {
            // Pass main navigator down to child 
            // navigator and screens so child  
            // screens can navigate to main screens.
            mainNavigator: navigation,
            ...screenProps
          }
        } />);
      },
      navigationOptions: {
        drawerLabel: "Home",
        drawerIcon: ({ tintColor }) => (
          <Icon
            type="font-awesome"
            name="home"
            color={tintColor}
          />
        )
      }
    },
    Section1: Seperator,
    Profile: {
      screen: navWithLoadingOverlay(ProfileNav),
      navigationOptions: {
        drawerLabel: "Profile",
        drawerIcon: ({ tintColor }) => (
          <Icon
            type="font-awesome"
            name="user"
            color={tintColor}
          />
        )
      }
    },
    Account: {
      screen: navWithLoadingOverlay(Account),
      navigationOptions: {
        drawerLabel: "Account",
        drawerIcon: ({ tintColor }) => (
          <Icon
            type="material-icons"
            name="payment"
            color={tintColor}
          />
        )
      }
    },
    Section2: Seperator,
    Settings: {
      screen: navWithLoadingOverlay(Settings),
      navigationOptions: {
        drawerLabel: "Settings",
        drawerIcon: ({ tintColor }) => (
          <Icon
            type="material-icons"
            name="settings"
            color={tintColor}
          />
        )
      }
    },
    Help: {
      screen: navWithLoadingOverlay(Help),
      navigationOptions: {
        drawerLabel: "Help",
        drawerIcon: ({ tintColor }) => (
          <Icon
            type="font-awesome"
            name="question"
            color={tintColor}
          />
        )
      }
    },
    Section3: Seperator,
    SignOut: {
      screen: SignOut,
      navigationOptions: {
        drawerLabel: "Sign Out",
        drawerIcon: ({ tintColor }) => (
          <Icon
            type="font-awesome"
            name="sign-out"
            color={tintColor}
          />
        )
      }
    }
  },
  {
    initialRouteName: "Home",
    drawerWidth: THEME.menuDrawerWidth,
    drawerBackgroundColor: "transparent",
    contentOptions: drawerStyles,
    contentComponent: (props) => (
      <ScrollView contentContainerStyle={styles.container}>

        <SafeAreaView
          forceInset={{ top: "always", horizontal: "never" }}>

          <AvatarView
            style={styles.avatarView}
          />
          <DrawerItems
            {...props}
          />
        </SafeAreaView>

        <TouchableWithoutFeedback
          onPress={() => {
            props.navigation.closeDrawer();
          }}>

          <View
            style={{ flex: 1 }}
          />
        </TouchableWithoutFeedback>
      </ScrollView >
    )
  }
);

export default MainNav;

// Stack navigation helpers

/**
 * 
 * @param {*} title 
 */
export function stackFirstHeader(title) {

  return ({ navigation }) => {

    return {
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
          onPress={navigation.openDrawer}
        />
      ),
      title: title,
      headerRight: (
        <Icon
          type="font-awesome"
          name="home"
          color={stackStyles.headerIconColor}
          underlayColor="transparent"
          containerStyle={styles.stackHeaderIcon}
          onPress={() => navigation.navigate("Home")}
        />
      )
    };
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
              onPress={() => onPress()}
            >
              <Text style={styles.stackHeaderBackTitleStyle}>{title}</Text>
            </TouchableHighlight>
          </View>
        )
      },
      title: title,
    };
  };
}

/**
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
    navigationOptions: params => ({
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
