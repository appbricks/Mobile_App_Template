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

import Help from "../../screens/Help";

const HelpNav = createStackNavigator(
  {
    Help: {
      screen: Help,
      navigationOptions: stackFirstHeader("Help")
    }
  },
  stackNavigatorConfig("Help")
);

export default drawerChildNav(HelpNav);
