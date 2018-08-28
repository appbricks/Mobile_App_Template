/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 */
import React, { Component } from "react";
import { View, Text } from 'react-native';
import { Badge } from "react-native-elements";

import { Agenda } from "react-native-calendars";

import { connect } from "react-redux";

import AuthComponent, {
  mapAuthStateToProps,
  mapAuthDispatchToProps
} from "../../components/AuthComponent";

import StackView from "../../components/StackView";

import Logger from "../../../lib/utils/Logger";

import {
  THEME,
  HOME_VIEW_HEIGHT
} from "../../styles/common";
import styles, {
  agendaViewTheme
} from "./styles";

import { COLOR_LIST } from "../../styles/colors";

type Props = {};
class Schedule extends AuthComponent<Props> {

  constructor(props) {
    super("Schedule", props);

    this.dateMarkers = [];
    for (let i = 0; i < 10; i++) {
      this.dateMarkers.push({
        key: "space" + i,
        color: COLOR_LIST[i + 7],
        selectedDotColor: "transparent"
      });
    }

    this.state = {
      items: {},
      markedDates: {}
    };
  }

  onContext() {
    super.logger.info("Schedule context menu pressed.");
  }

  loadItems(day) {
    setTimeout(() => {

      const items = {};
      const markedDates = {};

      for (let i = -15; i < 85; i++) {

        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);

        if (!this.state.items[strTime]) {

          const numItems = Math.floor(Math.random() * 5);

          items[strTime] = [];
          markedDates[strTime] = {
            dots: []
          };

          for (let j = 0; j < numItems; j++) {

            let k = Math.floor(Math.random() * 10);

            items[strTime].push({
              date: strTime,
              value: k,
              height: 50
            });

            // Date marker keys must be unique

            let dots = markedDates[strTime].dots;
            let key = this.dateMarkers[k].key;

            if (!dots.find(m => m.key == key)) {
              dots.push(this.dateMarkers[k]);
            }
          }
        } else {
          items[strTime] = this.state.items[strTime];
          markedDates[strTime] = this.state.markedDates[strTime];
        }
      }

      this.setState({
        items,
        markedDates
      });

    }, 100);
  }

  renderItem(item) {
    return (
      <View style={[styles.item, { height: item.height }]}>

        <Badge
          value={item.value}
          containerStyle={{
            marginLeft: 5,
            marginRight: 10,
            backgroundColor: COLOR_LIST[item.value + 7]
          }}
          textStyle={{
            fontFamily: "Lato-Bold",
            fontSize: 12,
            color: THEME.cardBackground
          }}
        />

        <Text style={styles.itemText}>
          My Listing on {item.date}
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
          rowHasChanged={this.rowHasChanged.bind(this)}
          markedDates={this.state.markedDates}
          markingType={"multi-dot"} />

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
