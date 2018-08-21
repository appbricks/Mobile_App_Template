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

import MySpaces from "../../screens/MySpaces";

const MySpacesNav = createStackNavigator(
  {
    MySpaces: {
      screen: MySpaces,
      navigationOptions: stackFirstHeader("MySpaces")
    },
  },
  stackNavigatorConfig("MySpaces")
);

export default drawerChildNav(MySpacesNav);
