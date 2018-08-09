/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 */
import React, { Component } from "react";
import { View, ScrollView, TouchableWithoutFeedback } from "react-native";
import { createDrawerNavigator, SafeAreaView } from 'react-navigation';
import { Icon } from "react-native-elements";

import { DrawerItems, seperator } from "../../components/DrawerItems";

import AvatarView from "../../components/AvatarView";

import HomeNav from "../HomeNav";

import Profile from "../../screens/Profile";
import Account from "../../screens/Account";
import Settings from "../../screens/Settings";
import Help from "../../screens/Help";
import SignOut from "../../screens/SignOut";

import common, { COLORS, THEME } from "../../styles/common";
import styles, { drawerStyles, stackStyles } from "./styles";

const MainNav = createDrawerNavigator(
  {
    Home: {
      screen: (props) => {

        const { navigation, screenProps } = props;

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
    Section1: seperator,
    Profile: {
      screen: Profile,
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
      screen: Account,
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
    Section2: seperator,
    Settings: {
      screen: Settings,
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
      screen: Help,
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
    Section3: seperator,
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
          onPress={navigation.openDrawer} />
      ),
      title: title,
      headerRight: (
        <Icon
          type="font-awesome"
          name="home"
          color={stackStyles.headerIconColor}
          underlayColor="transparent"
          containerStyle={styles.stackHeaderIcon}
          onPress={() => navigation.navigate("Home")} />
      )
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
    transitionConfig: () => ({
      containerStyle: {
      }
    }),
  };
}
