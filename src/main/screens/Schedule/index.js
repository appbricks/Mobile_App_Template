/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 */
import React, { Component } from "react";
import { View, Text } from 'react-native';

import { Agenda } from "react-native-calendars";

import { connect } from "react-redux";

import AuthComponent, {
  mapAuthStateToProps,
  mapAuthDispatchToProps
} from "../../components/AuthComponent";

import StackView from "../../components/StackView";

import Logger from "../../../lib/utils/Logger";

import {
  HOME_VIEW_HEIGHT
} from "../../styles/common";
import styles, {
  agendaViewTheme
} from "./styles";

type Props = {};
class Schedule extends AuthComponent<Props> {

  constructor(props) {
    super("Schedule", props);

    this.state = {
      items: {}
    };
  }

  onContext() {
    super.logger.info("Schedule context menu pressed.");
  }

  loadItems(day) {
    setTimeout(() => {

      for (let i = -15; i < 85; i++) {

        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);

        if (!this.state.items[strTime]) {
          this.state.items[strTime] = [];
          const numItems = Math.floor(Math.random() * 5);

          for (let j = 0; j < numItems; j++) {
            this.state.items[strTime].push({
              name: 'Item for ' + strTime,
              height: Math.max(50, Math.floor(Math.random() * 150))
            });
          }
        }
      }

      const newItems = {};
      Object
        .keys(this.state.items)
        .forEach(key => { newItems[key] = this.state.items[key]; });

      this.setState({
        items: newItems
      });

    }, 1000);
  }

  renderItem(item) {
    return (
      <View style={[styles.item, { height: item.height }]}>
        <Text style={styles.itemText}>
          {item.name}
        </Text>
      </View>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate} />
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }

  render() {
    const {
      backgroundImage
    } = this.props.screenProps;

    return (
      <StackView
        scrollHeight={HOME_VIEW_HEIGHT - 15}
        backgroundImage={backgroundImage}>

        <Agenda
          theme={agendaViewTheme}
          style={styles.scheduleCard}
          items={this.state.items}
          loadItemsForMonth={this.loadItems.bind(this)}
          selected={this.timeToString(new Date())}
          renderItem={this.renderItem.bind(this)}
          renderEmptyDate={this.renderEmptyDate.bind(this)}
          rowHasChanged={this.rowHasChanged.bind(this)} />

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

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);
