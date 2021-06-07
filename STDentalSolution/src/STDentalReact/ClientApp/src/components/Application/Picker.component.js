//https://material-ui-pickers.dev/demo/timepicker

import format from "date-fns/format";
//import frLocale from "date-fns/locale/fr";
import ruLocale from "date-fns/locale/ru";
import enLocale from "date-fns/locale/en-US";
import DateFnsUtils from "@date-io/date-fns";
import MoreIcon from "@material-ui/icons/MoreVert";
import React, { setState, useState, useCallback } from "react";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { Component } from "react";
import * as moment  from 'moment';

const localeMap = {
  en: enLocale,
  //fr: frLocale,
  ru: ruLocale,
};

class RuLocalizedUtils extends DateFnsUtils {
  getCalendarHeaderText(date) {
    return format(date, "LLLL", { locale: this.locale });
  }

  getDatePickerHeaderText(date) {
    return format(date, "dd MMMM", { locale: this.locale });
  }
}

/*class FrLocalizedUtils extends DateFnsUtils {
  getDatePickerHeaderText(date) {
    return format(date, "d MMM yyyy", { locale: this.locale });
  }
}*/

const localeUtilsMap = {
  en: DateFnsUtils,
  //fr: FrLocalizedUtils,
  ru: RuLocalizedUtils,
};

const localeFormatMap = {
  en: "MMMM d, yyyy",
  //fr: "d MMM yyyy",
  ru: "d MMM yyyy",
};

const localeCancelLabelMap = {
  en: "cancel",
  //fr: "annuler",
  ru: "отмена",
};

function DateFnsLocalizationExample(props) {
  const [locale, setLocale] = useState("ru");
  const [anchorEl, setAnchorEl] = useState(null);
  let [selectedDate, handleDateChange] = useState(new Date());

  //setState({ selectedDate: props.selectedDate });

  //useState({})

    //console.log(`props.selectedTalonDate = ${props.selectedDate}`);
    //console.log(`---------------`)
    //console.log(selectedDate);

  const handleMenuOpen = useCallback(e => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  }, []);

  const selectLocale = useCallback(locale => {
    setLocale(locale);
    setAnchorEl(null);
  }, []);

  

  return (
    <MuiPickersUtilsProvider utils={localeUtilsMap[locale]} locale={localeMap[locale]} >
      <DatePicker
        //value={selectedDate}
        value={props.selectedDate}
        //value={new Date("2000-05-01")}
        //onChange={handleDateChange}
        
        //onChange={(value) => {props.onSelected(value); handleDateChange(value)}}
        //onChange={(value) => {props.onSelected(value); handleDateChange(value)}}
        //onChange={(value) => {props.onSelected(value); handleDateChange(value)}}
        onChange={(value) => {props.onSelected(value)}}

        format={localeFormatMap[locale]}
        cancelLabel={localeCancelLabelMap[locale]}
        label={props.labelvalue}
        InputProps={{
          endAdornment: (
            <IconButton
              aria-label="Select locale"
              onClick={handleMenuOpen}
              aria-owns={anchorEl ? "locale-menu" : undefined}
            >
              <MoreIcon />
            </IconButton>
          ),
        }}
      />

      <Menu
        id="locale-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        {Object.keys(localeMap).map(localeItem => (
          <MenuItem
            key={localeItem}
            selected={localeItem === locale}
            onClick={() => selectLocale(localeItem)}
          >
            {localeItem}
          </MenuItem>
        ))}
      </Menu>
    </MuiPickersUtilsProvider>
  );
}

export default DateFnsLocalizationExample;