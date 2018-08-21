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

import MyListings from "../../screens/MyListings";

const MyListingsNav = createStackNavigator(
  {
    MyListings: {
      screen: MyListings,
      navigationOptions: stackFirstHeader(
        "MyListings",
        {
          iconType: "font-awesome",
          iconName: "plus",
          route: "MyListings"
        })
    },
  },
  stackNavigatorConfig("MyListings")
);

export default drawerChildNav(MyListingsNav);
