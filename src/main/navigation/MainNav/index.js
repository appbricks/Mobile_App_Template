/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 */
import React, { Component } from "react";
import { View, ScrollView, TouchableHighlight, TouchableWithoutFeedback, Text } from "react-native";

import { createDrawerNavigator, SafeAreaView } from 'react-navigation';
import { Icon } from "react-native-elements";

import {
  DrawerItems,
  Seperator
} from "../../components/Navigation";

import AvatarView from "../../components/AvatarView";

import HomeNav from "../HomeNav";
import ProfileNav from "../ProfileNav";
import AccountNav from "../AccountNav";
import SettingsNav from "../SettingsNav";
import HelpNav from "../HelpNav";
import SignOut from "../../screens/SignOut";

import common, {
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
      screen: ProfileNav,
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
      screen: AccountNav,
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
      screen: SettingsNav,
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
      screen: HelpNav,
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

  return ({ navigation, screenProps }) => {

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
              onPress={() => onPress()} >

              <Text style={styles.stackHeaderBackTitleStyle}>{title}</Text>

            </TouchableHighlight>
          </View>
        )
      },
      title: title
    };
  };
}
