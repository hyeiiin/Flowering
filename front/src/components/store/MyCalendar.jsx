import { useState } from 'react';
import Calendar from 'react-calendar';
import moment from "moment";
import styled from 'styled-components';

import 'react-calendar/dist/Calendar.css'

const StyledCalendar = styled(Calendar)`
  &.react-calendar {
    width: 350px;
    max-width: 100%;
    border: 10px solid purple;
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.125em;
    font-weight: 600;
  }


  & .react-calendar--doubleView {
    width: 700px;
  }

  & .react-calendar--doubleView .react-calendar__viewContainer {
    display: flex;
    margin: -0.5em;
  }

  & .react-calendar--doubleView .react-calendar__viewContainer > * {
    width: 50%;
    margin: 0.5em;
  }

  & .react-calendar,
  & .react-calendar *,
  & .react-calendar *:before,
  & .react-calendar *:after {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  & .react-calendar button {
    margin: 0;
    border: 0;
    outline: none;
  }

  & .react-calendar button:enabled:hover {
    cursor: pointer;
  }

  & .react-calendar__navigation {
    display: flex;
    height: 44px;
    margin-bottom: 1em;
  }

  & .react-calendar__navigation button {
    min-width: 44px;
    background: none;
    font-weight: bold;
    background-color: #fff;
  }

  & .react-calendar__navigation button:disabled {
    background-color: #f0f0f0;
  }

  & .react-calendar__navigation button:enabled:hover,
  & .react-calendar__navigation button:enabled:focus {
    background-color: white;
  }

  & .react-calendar__month-view__weekdays {
    text-align: center;
    text-transform: uppercase;
    font: inherit;
    font-size: 0.75em;
    font-weight: bold;
    abbr {
      text-decoration: none;
    }
  }

  & .react-calendar__month-view__weekdays__weekday {
    padding: 0.5em;
  }

  & .react-calendar__month-view__weekNumbers .react-calendar__tile {
    display: flex;
    align-items: center;
    justify-content: center;
    font: inherit;
    font-size: 0.75em;
    font-weight: bold;
  }

  & .react-calendar__month-view__days__day--weekend {
    color: black;
  }

  & .react-calendar__month-view__days__day--neighboringMonth,
  & .react-calendar__decade-view__years__year--neighboringDecade,
  & .react-calendar__century-view__decades__decade--neighboringCentury {
    display: none;
  }

  & .react-calendar__year-view .react-calendar__tile,
  & .react-calendar__decade-view .react-calendar__tile,
  & .react-calendar__century-view .react-calendar__tile {
    padding: 2em 0.5em;
  }

  & .react-calendar__tile {
    max-width: 100%;
    padding: 15px 6.6667px;
    background: none;
    text-align: center;
    line-height: 16px;
    font: inherit;
    font-size: 0.833em;
  }

  & .react-calendar__tile:disabled {
    background-color: #f0f0f0;
    color: #ababab;
  }

  & .react-calendar__month-view__days__day--neighboringMonth:disabled,
  & .react-calendar__decade-view__years__year--neighboringDecade:disabled,
  & .react-calendar__century-view__decades__decade--neighboringCentury:disabled {
    color: #cdcdcd;
  }

  & .react-calendar__tile:enabled:hover,
  & .react-calendar__tile:enabled:focus {
    background-color: white;
  }

  & .react-calendar__tile--now {
    /* background: #ffff76; */
  }

  & .react-calendar__tile--now:enabled:hover,
  & .react-calendar__tile--now:enabled:focus {
    /* background: #ffffa9; */
  }

  & .react-calendar__tile--hasActive {
    /* background: #F28482; */
  }

  & .react-calendar__tile--hasActive:enabled:hover,
  & .react-calendar__tile--hasActive:enabled:focus {
    /* background: #F28482; */
  }
  
  & .react-calendar__tile--active {
    background: #F28482;
    color: white;
    border-radius: 50%;
    transform: scale(0.6);
    font-size: 23px;
  }

  & .react-calendar__tile--active:enabled:hover,
  & .react-calendar__tile--active:enabled:focus {
    background: #F28482;
    
  }

  & .react-calendar--selectRange .react-calendar__tile--hover {
    background-color: #e6e6e6;
  }
`;

const MyCalendar = () => {
  const [value, onChange] = useState(new Date());

  return (
    <>
      <StyledCalendar
        locale="en"
        onChange={onChange}
        value={value}
        formatDay={(locale, value) =>
          moment(value).format("D")}
      />

      <div>현재 선택한 날짜</div>
      {moment(value).format("YYYY년 MM월 DD일")} 
    </>
  )
}

export default MyCalendar;