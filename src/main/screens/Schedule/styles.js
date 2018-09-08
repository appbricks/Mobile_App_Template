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
  textMonthFontFamily: "Lato-Bold",
  textMonthFontWeight: "bold",
  textMonthFontSize: 16,
  textDayHeaderFontFamily: "Lato-Bold",
  textDayHeaderFontSize: 13,
  textDayFontFamily: "Lato-Regular",
  textDayFontSize: 16,

  dotColor: COLORS.red,
  selectedDotColor: COLORS.white,
  selectedDayBackgroundColor: THEME.color,

  textDayHeaderFontSize: 14,
  textDayHeaderFontFamily: "Lato-Regular",
  textSectionTitleColor: THEME.color,

  agendaKnobColor: COLORS.iconShade1,
  agendaDayNumColor: COLORS.white,
  agendaDayTextColor: COLORS.white,

  "stylesheet.calendar-list.main": {
    calendar: {
      paddingLeft: 2,
      paddingRight: 4
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
    marginTop: 8,
    marginBottom: 8
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
