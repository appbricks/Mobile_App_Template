/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 */
import React from "react";
import { createStackNavigator } from 'react-navigation';

import {
  drawerChildNav,
  stackNavigatorConfig
} from "../../components/Navigation";

import {
  stackFirstHeader,
  stackHeader
} from "../MainNav";

import Profile from "../../screens/Profile";
import VerifyContact from "../../screens/VerifyContact"

const ProfileNav = createStackNavigator(
  {
    Profile: {
      screen: Profile,
      navigationOptions: stackFirstHeader("Profile")
    },
    VerifyEmailAddress: {
      screen: (props) => {

        return (<VerifyContact
          verifyType="emailAddress"
          {...props} />);
      },
      navigationOptions: stackHeader("Verify Email Address")
    },
    VerifyMobilePhone: {
      screen: (props) => {

        return (<VerifyContact
          verifyType="mobilePhone"
          {...props} />);
      },
      navigationOptions: stackHeader("Verify Mobile Phone")
    }
  },
  stackNavigatorConfig("Profile")
);

export default drawerChildNav(ProfileNav);
