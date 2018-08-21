/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 */
import React, { Component } from "react";
import { View, Text } from 'react-native';
import { Avatar, Icon } from "react-native-elements";

import { connect } from "react-redux";

import Logger from "../../../lib/utils/Logger";

import common, { THEME } from "../../styles/common";
import styles, { WATERMARK_SIZE } from "./styles"

type Props = {};
class AvatarView extends Component<Props> {

  constructor(props) {
    super(props);

    this.mounted = false;

    const { avatar } = this.props;
    this.avatarImage = avatar.getImage();

    uri = this.avatarImage.getUri();
    this.state = {
      avatarUri: uri.uri,
      avatarTitle: uri.title
    }
  }

  componentDidMount() {
    this.mounted = true;
    this.avatarImage.addUpdateCallback(this._avatarUpdated.bind(this));
  }

  componentWillUnmount() {
    this.avatarImage.removeUpdateCallback(this._avatarUpdated.bind(this));
    this.mounted = false;
  }

  _avatarUpdated(uri) {

    if (this.mounted) {

      this.setState({
        avatarUri: uri.uri,
        avatarTitle: uri.title
      });
    }
  };

  render() {

    const { avatarUri, avatarTitle } = this.state;

    if (avatarUri) {

      return (
        <View
          style={[styles.container, this.props.style]}
        >
          {avatarTitle ? (
            <Text style={styles.avatarTitleHeader}>
              {avatarTitle}
            </Text>
          ) : false}

          <Avatar
            rounded
            size="xlarge"
            source={{ uri: avatarUri }}
            overlayContainerStyle={[styles.overlayStyle, { marginTop: 20 }]}
          />
        </View>
      );

    } else {

      let title = avatarTitle || "";

      avatarTitleStyle = (title.length < 3
        ? styles.avatarTitleLarge
        : styles.avatarTitleSmall);

      return (
        <View
          style={[styles.container, this.props.style]}
        >
          <Avatar
            rounded
            size="xlarge"
            title={title}
            titleStyle={avatarTitleStyle}
            overlayContainerStyle={styles.overlayStyle}
          />

          <Icon
            type="font-awesome"
            name="user"
            color={THEME.avatarColor}
            opacity={0.25}
            size={WATERMARK_SIZE}
            containerStyle={styles.avatarIconWatermark}
          />

        </View>
      );
    }
  }
}

// **** Integration with redux store ****

const mapStateToProps = state => {
  return {
    avatar: state.ui.avatar,
    user: state.auth.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AvatarView);
