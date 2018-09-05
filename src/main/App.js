/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 */
import React, { Component } from "react";
import { createSwitchNavigator } from 'react-navigation';

import Amplify from 'aws-amplify';
import awsconfig from "../aws-exports";
Amplify.configure(awsconfig);

import LocalStorage from "../lib/persistance/LocalStorage";
import MutableImage from "../lib/presentation/MutableImage";

import { withAuth, registerAuthValidationRoute } from "../lib/authentication/Auth";
import Session from "../lib/authentication/aws/Session";

// Application redux store
import { reduxStore } from "./redux";

// Background image
import { BACKGROUND_IMAGE } from "./styles/common";
const backgroundImage = new MutableImage(BACKGROUND_IMAGE);

// Components
import { withBackdrop } from "./components/Backdrop";

// Navigation
import MainNav from "./navigation/MainNav";

// Loading screen
import AuthLoading from "./screens/AuthLoading";

// Authentication screens
import SignIn from "./screens/SignIn";
import PasswordReset from "./screens/PasswordReset";
import SignUp from "./screens/SignUp";
import VerifyAccount from "./screens/VerifyAccount";

// Account management and settings screens

// Home screens

// Global variables
var LOG_LEVEL = "trace";

// Global singletons

const authSession = new Session();

const AppNav = createSwitchNavigator(
    {
        AuthLoading: (props) => {

            const { navigation } = props;
            registerAuthValidationRoute(navigation, "AuthLoading");

            return <AuthLoading {...props} />
        },

        // Application authentication screens
        SignIn: SignIn,
        PasswordReset: PasswordReset,
        SignUp: SignUp,
        VerifyAccount: VerifyAccount,

        // Main application navigation screens
        Main: (props) => {

            const { screenProps } = props;
            screenProps.drawerLockMode = "unlocked";

            return (<MainNav screenProps={{ ...screenProps }} />);
        }
    },
    {
        initialRouteName: "AuthLoading"
    }
);
const App = withBackdrop(backgroundImage, AppNav);
const app = props => <App screenProps={{ ...props }} />;

export default withAuth(
    authSession,        // Provider specific auth session (i.e AWS Cognito)
    reduxStore,         // Redux data store for managing internal runtime state
    backgroundImage,    // Backdrop across all navigation screens
    app                 // Wrapped navigation component
);
