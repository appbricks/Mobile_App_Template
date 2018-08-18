/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 */
import React from "react";
import { createStackNavigator } from 'react-navigation';

import Profile from "../../screens/Profile";
import VerifyContact from "../../screens/VerifyContact"
import { stackFirstHeader, stackHeader, stackNavigatorConfig } from "../MainNav";

const ProfileNav = createStackNavigator(
  {
    Profile: {
      screen: Profile,
      navigationOptions: stackFirstHeader("Profile")
    },
    VerifyEmailAddress: {
      screen: (props) => {

        const { screenProps } = props;
        screenProps.drawerLockMode = "locked-closed";

        return (<VerifyContact
          verifyType="emailAddress"
          screenProps={
            {
              ...screenProps
            }
          } />);
      },
      navigationOptions: stackHeader("Verify Email Address")
    },
    VerifyMobilePhone: {
      screen: (props) => {

        const { screenProps } = props;
        screenProps.drawerLockMode = "locked-closed";

        return (<VerifyContact
          verifyType="mobilePhone"
          screenProps={
            {
              ...screenProps
            }
          } />);
      },
      navigationOptions: stackHeader("Verify Mobile Phone")
    }
  },
  stackNavigatorConfig("Profile")
);

export default ProfileNav;
