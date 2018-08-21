/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 */
import React, { Component } from "react";
import { AppState } from "react-native";
import { Provider } from "react-redux";

import SplashScreen from 'react-native-splash-screen';
import BackgroundTimer from 'react-native-background-timer';

import Logger from "../utils/Logger";
import Session from "./Session";

var authValidationCallback = () => { };

type Props = {};

/**
 * Wraps the given component with an authentication context.
 * 
 * @param {*} authSession      Provider specific auth session (i.e AWS Cognito)
 * @param {*} reduxStore       Redux data store for managing internal runtime state
 * @param {*} backgroundImage  Backdrop across all navigation screens
 * @param {*} C                Component to wrap (i.e navigation component)
 * 
 * @return Wrapped navigation component
 */
export function withAuth(
  authSession,
  reduxStore,
  backgroundImage,
  C
) {

  return (
    class extends Component<Props> {

      constructor(props) {
        super(props);

        this.logger = new Logger("withAuth");

        this.session = new Session(
          authSession,
          this._setReady.bind(this),
          this._setWait.bind(this),
          this._authValidationCallback.bind(this)
        );

        this.appInBackground = false;

        this.state = {
          ready: false,
          signedIn: null,
        };
      }

      async componentDidMount() {

        AppState.addEventListener('change', this._handleAppStateChange.bind(this));

        // If saved session is valid then ready should be 
        // false until session user has been re-authenticaed
        let signedIn = await this.session.authSession.validateSession();
        this._setReady(signedIn, !signedIn);

        SplashScreen.hide();
      }

      componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange.bind(this));
      }

      _handleAppStateChange(nextAppState) {
        this.logger.trace("application state change: ", nextAppState);

        switch (nextAppState) {
          case "inactive":
            break;

          case "background":

            // BackgroundTimer.runBackgroundTimer(() => {
            //   this.logger.trace("timer check at: ", Date.now());
            // }, 3000);

            this.session.user = null;
            this.appInBackground = true;
            break;

          case "active":

            // BackgroundTimer.stopBackgroundTimer();

            var validateSession = async () => {
              this._setReady(await this.session.authSession.validateSession());
            };

            if (this.appInBackground) {
              validateSession();
              this.appInBackground = false;
            }
            break;
        }
      }

      _setReady(signedIn?, ready = true) {

        if (typeof signedIn == "undefined") {

          this.logger.debug(
            "setting app ready state: signed in =", this.state.signedIn,
            ", ready =", ready);

          this.setState({
            ready: ready,
          });

        } else {

          this.logger.debug(
            "setting app ready state: signed in =", signedIn,
            ", ready =", ready);

          this.setState({
            ready: ready,
            signedIn: signedIn
          });
          this.session.isSignedIn = this.state.signedIn;
        }
      }

      _setWait(beforeWaitHandler?) {

        if (this.state.ready) {

          if (beforeWaitHandler) {
            beforeWaitHandler(this.authSession)
          }

          this.logger.trace("setting app wait state to true")
          this.setState({ ready: false });
        }
      }

      _authValidationCallback() {
        authValidationCallback();
      }

      render() {
        const { ready, signedIn } = this.state;

        const {
          session,
          ...otherProps
        } = this.props;

        return (

          <Provider
            store={reduxStore}>

            <C
              ready={ready}
              setReady={() => this._setReady()}
              signedIn={signedIn}
              session={session || this.session}
              backgroundImage={backgroundImage}
              {...otherProps}
            />

          </Provider>
        );
      }
    }
  );
}

/**
 * Registers a route to the screen that validates the current log-in session.
 * 
 * @param {*} appNavigator         navigation component within which the route is registered
 * @param {*} authValidationRoute  The log-in session validation route name
 */
export function registerAuthValidationRoute(
  appNavigator,
  authValidationRoute,
) {

  const navigation = appNavigator;

  // Navigators are available only at the child component 
  // level, so the callback needs to be updated with 
  // navigator in the properties of the wrapped component
  authValidationCallback = () => {

    Logger.trace("withAuth",
      "navigating to auth validation screen: ",
      authValidationRoute);

    navigation.navigate(authValidationRoute);
  }
}
