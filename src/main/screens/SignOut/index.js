/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 */
import React, { Component } from "react";
import { View, Text } from 'react-native';

import { connect } from "react-redux";

import AuthComponent, {
  mapAuthStateToProps,
  mapAuthDispatchToProps
} from "../../components/AuthComponent";

import LoadingView from "../../components/LoadingView";

type Props = {};
class SignOut extends AuthComponent<Props> {

  constructor(props) {
    super("SignOut", props);
  }

  componentDidMount() {
    super.onSignOut();
  }

  componentDidUpdate() {
  }

  render() {
    return (
      <View>
        <LoadingView show={true} />
      </View>
    );
  }
}

// **** Integration with redux store ****

const mapStateToProps = state => {
  return mapAuthStateToProps(state, {});
};

const mapDispatchToProps = dispatch => {
  return mapAuthDispatchToProps(dispatch, {});
};

export default connect(mapStateToProps, mapDispatchToProps)(SignOut);
