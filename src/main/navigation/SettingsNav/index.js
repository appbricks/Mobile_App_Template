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

import Settings from "../../screens/Settings";

const SettingsNav = createStackNavigator(
  {
    Settings: {
      screen: Settings,
      navigationOptions: stackFirstHeader("Settings")
    }
  },
  stackNavigatorConfig("Settings")
);

export default drawerChildNav(SettingsNav);
