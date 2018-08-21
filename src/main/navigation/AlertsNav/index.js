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
} from "../HomeNav";

import Alerts from "../../screens/Alerts";

const AlertsNav = createStackNavigator(
  {
    Alerts: {
      screen: Alerts,
      navigationOptions: stackFirstHeader("Alerts")
    },
  },
  stackNavigatorConfig("Alerts")
);

export default drawerChildNav(AlertsNav);
