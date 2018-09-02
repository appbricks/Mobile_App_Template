/*
 * Copyright 2018-2018 AppBricks, Inc. or its affiliates. All Rights Reserved.
 */
import { StyleSheet } from "react-native";

import { hexToRgba } from "../../../lib/utils/colors";

import {
  COLORS,
  THEME
} from "../../styles/common";

export const agendaViewTheme = {

  backgroundColor: THEME.homeBarBackground,
  calendarBackground: THEME.cardBackground,

  dayTextColor: THEME.color,
  selectedDayTextColor: THEME.cardBackground,
  todayTextColor: COLORS.iconBlue,
  agendaTodayColor: COLORS.iconBlue,

  textSectionTitleColor: THEME.color,
  textDisabledColor: THEME.disabledColor,

  monthTextColor: THEME.color,
  textDayFontFamily: "Lato-Regular",
  textMonthFontFamily: "Lato-Bold",
  textMonthFontWeight: "bold",
  textDayFontSize: 16,
  textMonthFontSize: 16,

  dotColor: COLORS.red,
  selectedDotColor: COLORS.white,
  selectedDayBackgroundColor: THEME.color,

  textDayHeaderFontSize: 14,
  textDayHeaderFontFamily: "Lato-Regular",
  textSectionTitleColor: THEME.color,

  agendaKnobColor: COLORS.iconShade1,
  agendaDayNumColor: COLORS.white,
  agendaDayTextColor: COLORS.white,

  "stylesheet.agenda.main": {
    weekdays: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginLeft: 2,
      paddingTop: 15,
      paddingBottom: 7,
      backgroundColor: THEME.cardBackground,
    },
    weekday: {
      width: 32,
      textAlign: 'center',
      color: THEME.color,
      fontSize: 14,
      fontFamily: "Lato-Regular",
    },
    reservations: {
      flex: 1,
      marginTop: 100,
      paddingTop: 2,
      paddingBottom: 2,
      backgroundColor: THEME.homeBarBackground,
    },
  },

  "stylesheet.calendar-list.main": {
    calendar: {
      paddingLeft: 2,
      paddingRight: 24
    }
  }
}

export default StyleSheet.create({
  scheduleCard: {
    borderWidth: 2,
    borderRadius: 5,
    borderColor: COLORS.silver,
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10
  },
  item: {
    backgroundColor: THEME.cardBackground,
    flex: 1,
    flexDirection: "row",
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  itemText: {
    padding: 2,
    fontFamily: "Lato-Regular",
    fontSize: 12,
    color: THEME.color,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  }
})
