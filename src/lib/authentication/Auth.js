/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 */
import React, { Component } from "react";
import { AppState, Alert } from "react-native";
import { Provider } from "react-redux";
import { Auth } from "aws-amplify";

import SplashScreen from 'react-native-splash-screen';
import BackgroundTimer from 'react-native-background-timer';

import { LocalStorage } from "../persistance/LocalStorage";
import { timeout } from "../utils/Timer";
import Logger from "../utils/Logger";

export const AUTH_NO_MFA = 0;
export const AUTH_MFA_SMS = 1;
export const AUTH_MFA_TOTP = 2;

export const USER_UNDEFINED = 0;
export const USER_LOGGED_OUT = 1;
export const USER_LOGGED_IN = 2;
export const USER_NEEDS_AUTH = 3;

var navigateToAuthValidationRoute = () => { };

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

  return class extends Component<Props> {

    constructor(props) {
      super(props);

      this.logger = new Logger("withAuth");

      this.authSession = authSession;
      this.user = null;

      this.state = {
        ready: false,
        signedIn: null,
      };
    }

    async componentDidMount() {

      AppState.addEventListener('change', this._handleAppStateChange.bind(this));

      // If saved session is valid then ready should be 
      // false until session user has been re-authenticaed
      let signedIn = await this.authSession.validateSession();
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

          if (this.state.signedIn
            && this.user && !this.user.rememberSignIn()) {

            this._doSignOut();
          } else {
            this.user = null;
          }
          break;

        case "active":

          // BackgroundTimer.stopBackgroundTimer();

          var validateSession = async () => {
            this._setReady(await this.authSession.validateSession());
          };

          validateSession();
          break;
      }
    }

    handleOnSignIn(user, successHandler?, errorHandler?, beforeWaitHandler?) {

      this._setWait(beforeWaitHandler);
      this.logger.trace("signing in user: ", user);

      this.authSession.signIn(user)
        .then(async challange => {

          if (challange == AUTH_NO_MFA) {

            await this.authSession.readUser(user);

            this.user = user;
          }

          if (successHandler) {
            successHandler(challange);
          }
          this._setReady(await this.authSession.validateSession());
        })
        .catch(error => {
          this.logger.error("sign-in error: ", error);
          this._handleAuthError(
            "There was a problem signing in.",
            error, errorHandler);
        });
    }

    handleOnSignInMFA(user, code, successHandler?, errorHandler?, beforeWaitHandler?) {

      this._setWait(beforeWaitHandler);

      this.authSession.mfaValidate(code)
        .then(async () => {

          await this.authSession.readUser(user);
          this.logger.trace("signed in user: ", user);

          this.user = user;

          if (successHandler) {
            successHandler();
          }
          this._setReady(await this.authSession.validateSession());
        })
        .catch(error => {
          this.logger.error("mfa validate error: ", error);
          this._handleAuthError(
            "There was a problem validating the MFA code.",
            error, errorHandler);
        });
    }

    handleOnSignOut(successHandler?, errorHandler?, beforeWaitHandler?) {

      this._setWait(beforeWaitHandler);
      navigateToAuthValidationRoute();

      this.authSession.signOut()
        .then(async () => {

          this.user = null;
          this._setReady(await this.authSession.validateSession(), false);

          if (successHandler) {
            successHandler();
          }
          this._setReady();
        })
        .catch(error => {
          this.logger.error("sign-out error: ", error);
          this._handleAuthError(
            "There was a problem signing out.",
            error, errorHandler);
        });
    }

    handleOnResetPassword(user, successHandler?, errorHandler?, beforeWaitHandler?) {

      this._setWait(beforeWaitHandler);

      this.authSession.resetPassword(user)
        .then(() => {

          if (successHandler) {
            successHandler()
          } else {
            this.logger.trace("password update for reset request successful");
          }
          this._setReady();
        })
        .catch(error => {
          this.logger.trace("error initiating password reset: ", error);
          this._handleAuthError(
            "There was a problem initiating a password reset.",
            error, errorHandler);
        });
    }

    handleOnUpdatePassword(user, code, successHandler?, errorHandler?, beforeWaitHandler?) {

      this._setWait(beforeWaitHandler);

      this.authSession.updatePassword(user, code)
        .then(() => {

          if (successHandler) {
            successHandler()
          } else {
            this.logger.trace("password update for reset request successful");
          }
          this._setReady();
        })
        .catch(error => {
          this.logger.error("password update error: ", error);
          this._handleAuthError(
            "There was a problem updating the password.",
            error, errorHandler);
        });
    }

    handleOnSignUp(user, successHandler?, errorHandler?, beforeWaitHandler?) {

      this._setWait(beforeWaitHandler);

      this.authSession.signUp(user)
        .then(userConfirmed => {

          if (successHandler) {
            successHandler(userConfirmed)
          } else {
            this.logger.trace(
              "sign-up completed. user confirmation status is: ",
              userConfirmed);
          }
          this._setReady();
        })
        .catch(error => {
          this.logger.error("sign-up error: ", error);
          this._handleAuthError(
            "There was a problem with user registration.",
            error, errorHandler);
        });
    }

    handleOnSignUpVerify(user, code, successHandler?, errorHandler?, beforeWaitHandler?) {

      this._setWait(beforeWaitHandler);

      this.authSession.signUpVerify(user, code)
        .then(async user => {

          try {
            this.logger.trace(
              "signing in transparently to updated MFA preferences for user: ",
              user);

            await this.authSession.signIn(user);
            await this.authSession.readUser(user, ["email", "phone_number"]);
            await this.authSession.saveUser(user);
            await this.authSession.configureMFA(user);

          } catch (exception) {
            this.logger.error("error confirming sign-up: ", exception);

            this._handleAuthError(
              "Sign-up confirmed but an error occurred updating the MFA preference.",
              exception, errorHandler);

          } finally {
            await this.authSession.signOut();
          }

          if (successHandler) {
            successHandler(user)
          } else {
            this.logger.trace("sign-up code verified");
          }

          this._setReady();
        })
        .catch(error => {
          this.logger.error("error confirming sign-up code: ", error);
          this._handleAuthError(
            "There was a problem verifying the sign-up confirmation code.",
            error, errorHandler);
        });
    }

    handleOnResendSignUpCode(user) {

      this._setWait();

      this.authSession.resendSignUpCode(user)
        .then(() => {
          this._setReady();
        })
        .catch(error => {
          this.logger.trace("error resending sign-up code: ", error);
          this._handleAuthError(
            "There was a problem re-sending the sign-up confirmation code.",
            error);
        });
    }

    validateUser(user) {

      var userState = (!this.user && !user
        ? USER_LOGGED_OUT
        : USER_LOGGED_IN);

      if (this.user !== user) {

        userState = USER_LOGGED_OUT;

        if (!this.user && user) {

          if (user.isValid()) {

            if (this.signedIn
              && this.authSession.cognitoUser.username != user.username) {

              this.logger.trace(
                "terminating current session as the logged-in user",
                this.authSession.cognitoUser.username,
                "is different to the remembered user",
                user.username,
                "from state.");

              this._doSignOut();

            } else if (user.rememberSignIn()) {

              this.logger.trace(
                "initializing auth context with remembered user",
                user.username,
                "from state.");

              userState = USER_NEEDS_AUTH;
              this.user = user;

            } else {

              this.logger.trace(
                "signing out as user",
                user.username,
                "from state should not be remembered");

              this._doSignOut();
            }
          } else {
            userState = USER_UNDEFINED;

            this.logger.trace(
              "existing session will be terminated as user being validated is undefined");

            this._doSignOut();
          }

        } else {

          this.logger.trace(
            "signing out as user from state does not match user in context: ",
            this.user, user);

          this._doSignOut();
        }
      }

      this.logger.trace("current user state: ", userState);
      return userState;
    }

    _doSignOut() {

      if (this.state.signedIn) {
        navigateToAuthValidationRoute();

        this.authSession.signOut().then(
          async () => {

            this.logger.trace("user log-in session has been terminated");
            this.user = null;

            this._setReady(await this.authSession.validateSession());
          }
        );
      }
    }

    _handleAuthError(message, error, errorHandler?) {

      this._setReady();

      if (errorHandler) {
        errorHandler(error);
      } else {
        Alert.alert(
          "Error",
          message + "\n\n\"" + error + "\"",
          [
            { text: 'OK' }
          ],
          { cancelable: true }
        );
      }
    }

    _setReady(signedIn?, ready = true) {

      if (typeof (signedIn) == "undefined") {

        this.logger.trace(
          "setting app ready state: signed in =", this.state.signedIn,
          ", ready =", ready);

        this.setState({
          ready: ready,
        });

      } else {

        this.logger.trace(
          "setting app ready state: signed in =", signedIn,
          ", ready =", ready);

        this.setState({
          ready: ready,
          signedIn: signedIn
        });
      }
    }

    _setWait(beforeWaitHandler?) {

      if (beforeWaitHandler) {
        beforeWaitHandler(this.authSession)
      }

      this.logger.trace("setting app wait state to true")
      this.setState({ ready: false });
    }

    render() {
      const { ready, signedIn } = this.state;

      const {
        onSignIn,
        onSignInMFA,
        onSignOut,
        onResetPassword,
        onUpdatePassword,
        onSignUp,
        onSignUpVerify,
        onResendSignUpCode,
        ...otherProps
      } = this.props;

      return (

        <Provider
          store={reduxStore}>

          <C
            ready={ready}
            setReady={() => this._setReady()}
            signedIn={signedIn}
            onSignIn={onSignIn || this.handleOnSignIn.bind(this)}
            onSignInMFA={onSignIn || this.handleOnSignInMFA.bind(this)}
            onSignOut={onSignOut || this.handleOnSignOut.bind(this)}
            onResetPassword={onResetPassword || this.handleOnResetPassword.bind(this)}
            onUpdatePassword={onUpdatePassword || this.handleOnUpdatePassword.bind(this)}
            onSignUp={onSignUp || this.handleOnSignUp.bind(this)}
            onSignUpVerify={onSignUpVerify || this.handleOnSignUpVerify.bind(this)}
            onResendSignUpCode={onResendSignUpCode || this.handleOnResendSignUpCode.bind(this)}
            validateUser={this.validateUser.bind(this)}
            backgroundImage={backgroundImage}
            {...otherProps}
          />

        </Provider>
      );
    }
  }
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
  navigateToAuthValidationRoute = () => {

    Logger.trace("withAuth",
      "navigating to auth validation screen: ",
      authValidationRoute);

    navigation.navigate(authValidationRoute);
  }
}
