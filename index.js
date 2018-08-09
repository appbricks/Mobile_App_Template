/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 */

import { AppRegistry } from "react-native";
import App from "./src/main/App";
import { name as appName } from './app.json';

console.disableYellowBox = true;

AppRegistry.registerComponent(appName, () => App);
