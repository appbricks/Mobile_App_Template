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

import Schedule from "../../screens/Schedule";

const ScheduleNav = createStackNavigator(
  {
    Schedule: {
      screen: Schedule,
      navigationOptions: stackFirstHeader(
        "Schedule",
        {
          iconType: "font-awesome",
          iconName: "plus",
          route: "AddItem"
        })
    },
  },
  stackNavigatorConfig("Schedule")
);

export default drawerChildNav(ScheduleNav);
