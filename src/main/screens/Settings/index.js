/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 */
import React, { Component } from "react";

import { connect } from "react-redux";

import AuthComponent, {
  mapAuthStateToProps,
  mapAuthDispatchToProps
} from "../../components/AuthComponent";

import StackView from "../../components/StackView";

import Logger from "../../../lib/utils/Logger";

import styles from "./styles";

type Props = {};
class Settings extends AuthComponent<Props> {

  constructor(props) {
    super("Settings", props);
  }

  render() {
    const { backgroundImage } = this.props.screenProps;

    return (
      <StackView
        blurBackground
        backgroundImage={backgroundImage}>

      </StackView>
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

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
