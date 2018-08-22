/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 */
import React, { Component } from "react";
import { View, Text } from 'react-native';

import {
  Calendar,
  CalendarList,
  Agenda
} from 'react-native-calendars';

import { connect } from "react-redux";

import AuthComponent, {
  mapAuthStateToProps,
  mapAuthDispatchToProps
} from "../../components/AuthComponent";

import StackView from "../../components/StackView";
import CardView from "../../components/CardView";

import Logger from "../../../lib/utils/Logger";

import {
  THEME,
  HOME_VIEW_HEIGHT
} from "../../styles/common";
import { TRANSPARENT } from "../../components/CardView/styles";
import styles from "./styles";

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
      //console.log(this.state.items);
      const newItems = {};
      Object.keys(this.state.items).forEach(key => { newItems[key] = this.state.items[key]; });
      this.setState({
        items: newItems
      });
    }, 1000);
    // console.log(`Load Items for ${day.year}-${day.month}`);
  }

  renderItem(item) {
    return (
      <View style={[styles.item, { height: item.height }]}><Text>{item.name}</Text></View>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}><Text>This is empty date!</Text></View>
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
    const { backgroundImage } = this.props.screenProps;

    return (
      <StackView
        backgroundImage={backgroundImage}>

        {/* <CardView
          style={THEME.homeCardStyle}>

          <Calendar
            // Initially visible month. Default = Date()
            current={'2018-08-14'}
            // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
            minDate={'2018-08-14'}
            // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
            maxDate={'2019-08-13'}
            // Handler which gets executed on day press. Default = undefined
            onDayPress={(day) => { console.log('selected day', day) }}
            // Handler which gets executed on day long press. Default = undefined
            onDayLongPress={(day) => { console.log('selected day', day) }}
            // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
            monthFormat={'MMMM yyyy'}
            // Handler which gets executed when visible month changes in calendar. Default = undefined
            onMonthChange={(month) => { console.log('month changed', month) }}
            // Hide month navigation arrows. Default = false
            hideArrows={false}
            // Replace default arrows with custom ones (direction can be 'left' or 'right')
            // renderArrow={(direction) => (<Arrow />)}
            // Do not show days of other months in month page. Default = false
            hideExtraDays={false}
            // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
            // day from another month that is visible in calendar page. Default = false
            disableMonthChange={false}
            // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
            firstDay={1}
            // Hide day names. Default = false
            hideDayNames={false}
            // Show week numbers to the left. Default = false
            showWeekNumbers={false}
            // Handler which gets executed when press arrow icon left. It receive a callback can go back month
            onPressArrowLeft={substractMonth => substractMonth()}
            // Handler which gets executed when press arrow icon left. It receive a callback can go next month
            onPressArrowRight={addMonth => addMonth()}
          />

        </CardView> */}

        <CardView
          style={[
            THEME.homeCardStyle,
            {
              height: HOME_VIEW_HEIGHT - 20
            }
          ]}>

          <Agenda
            items={this.state.items}
            loadItemsForMonth={this.loadItems.bind(this)}
            selected={'2018-08-14'}
            renderItem={this.renderItem.bind(this)}
            renderEmptyDate={this.renderEmptyDate.bind(this)}
            rowHasChanged={this.rowHasChanged.bind(this)}
          // markingType={'period'}
          // markedDates={{
          //   '2018-08-08': { textColor: '#666' },
          //   '2018-08-09': { textColor: '#666' },
          //   '2018-08-14': { startingDay: true, endingDay: true, color: 'blue' },
          //   '2018-08-21': { startingDay: true, color: 'blue' },
          //   '2018-08-22': { endingDay: true, color: 'gray' },
          //   '2018-08-24': { startingDay: true, color: 'gray' },
          //   '2018-08-25': { color: 'gray' },
          //   '2018-08-26': { endingDay: true, color: 'gray' }
          // }}
          // monthFormat={'yyyy'}
          // theme={{ calendarBackground: 'red', agendaKnobColor: 'green' }}
          // renderDay={(day, item) => (<Text>{day ? day.day : 'item'}</Text>)}
          />
        </CardView>

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
