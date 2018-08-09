/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 */
import DrawerItems from "./DrawerNavigatorItems";

const seperator = {
  screen: (props) => <View />,
  navigationOptions: {
    drawerLabel: "---"
  }
};

export {
  DrawerItems,
  seperator
}
