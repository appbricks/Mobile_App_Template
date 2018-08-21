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

import Account from "../../screens/Account";

const AccountNav = createStackNavigator(
  {
    Account: {
      screen: Account,
      navigationOptions: stackFirstHeader("Account")
    }
  },
  stackNavigatorConfig("Account")
);

export default drawerChildNav(AccountNav);
