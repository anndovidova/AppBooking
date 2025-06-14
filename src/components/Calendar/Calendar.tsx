import React, { useState } from 'react';
import './Calendar.css';
import ButtonBook from '../../../../components/ButtonBook/ButtonBook';
import { useCalendar } from '../../../../context/CalendarContex';
import calenderLine from '../../../../images/calendarLine.svg'
import plus from '../../../../images/plus.svg';
import minus from '../../../../images/minus.svg';
import * as url from 'node:url';

const Calendar: React.FC = () => {
  const { closeCalendar } = useCalendar();
  const [checkInDate, setCheckInDate] = useState<string | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<string | null>(null);
  const [guests, setGuests] = useState<number>(1);
  const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const MAX_GUESTS = 5;

  const getNextMonth = (month: number, year: number) => {
    if (month === 11) return { month: 0, year: year + 1 };
    return { month: month + 1, year };
  };

  const getPrevMonth = (month: number, year: number) => {
    if (month === 0) return { month: 11, year: year - 1 };
    return { month: month - 1, year };
  };

  const handleDateClick = (day: number, month: number, year: number) => {
    const formattedDate = `${month + 1}/${day}/${year}`;
    if (!checkInDate || (checkInDate && checkOutDate)) {
      setCheckInDate(formattedDate);
      setCheckOutDate(null);
    } else if (new Date(year, month, day) > new Date(checkInDate)) {
      setCheckOutDate(formattedDate);
    }
  };

  const renderMonth = (month: number, year: number) => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<td key={`empty-${i}`} className="empty"></td>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const formattedDate = `${month + 1}/${day}/${year}`;
      let className = '';

      if (checkInDate === formattedDate) {
        className = 'selected check-in';
      } else if (checkOutDate === formattedDate) {
        className = 'selected check-out';
      } else if (
        checkInDate && checkOutDate &&
        new Date(year, month, day) > new Date(checkInDate) &&
        new Date(year, month, day) < new Date(checkOutDate)
      ) {
        className = 'selected between';
      }

      days.push(
        <td
          key={`day-${day}`}
          className={className}
          onClick={() => handleDateClick(day, month, year)}
        >
          {day}
        </td>
      );
    }

    const weeks = [];
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7));
    }

    if (weeks.length > 0 && weeks[weeks.length - 1].length < 7) {
      const lastWeek = weeks[weeks.length - 1];
      while (lastWeek.length < 7) {
        lastWeek.push(<td key={`empty-end-${lastWeek.length}`} className="empty"></td>);
      }
    }

    return weeks;
  };

  const nextMonths = () => {
    const next = getNextMonth(getNextMonth(currentMonth, currentYear).month,
      getNextMonth(currentMonth, currentYear).year);
    setCurrentMonth(next.month);
    setCurrentYear(next.year);
  };

  const prevMonths = () => {
    const prev = getPrevMonth(getPrevMonth(currentMonth, currentYear).month,
      getPrevMonth(currentMonth, currentYear).year);
    setCurrentMonth(prev.month);
    setCurrentYear(prev.year);
  };

  const clearDates = () => {
    setCheckInDate(null);
    setCheckOutDate(null);
  };

  const handleDecreaseGuests = () => {
    if (guests > 1) {
      setGuests(guests - 1);
    }
  };

  const handleIncreaseGuests = () => {
    if (guests < MAX_GUESTS) {
      setGuests(guests + 1);
    }
  };

  const firstMonth = { month: currentMonth, year: currentYear };
  const secondMonth = getNextMonth(currentMonth, currentYear);

  return (
    <div className="calendar">
      <div className="close">
        <button onClick={closeCalendar}></button>
      </div>

      <div className="calendar-date">
        <div className="date">
          <div className="date-input">
            <label>Check in</label>
            <input
              placeholder="Add dates"
              value={checkInDate || ""}
              readOnly
              className={checkInDate ? "has-value" : ""}
            />
          </div>
          <img src={calenderLine} alt=""/>
          <div className="date-input">
            <label>Check out</label>
            <input
              placeholder="Add dates"
              value={checkOutDate || ""}
              readOnly
              className={checkOutDate ? "has-value" : ""}
            />
          </div>
          <img src={calenderLine} alt=""/>
        </div>
        <div className="guests">
          <label>Guests</label>
          <div className="guest-control">
            <button
              style={{backgroundImage: `url(${minus})`}}
              onClick={handleDecreaseGuests}
              disabled={guests <= 1}
              className={guests <= 1 ? "disabled" : ""}
            ></button>
            <span>{guests}</span>
            <button
              style={{backgroundImage: `url(${plus})`, height:'10px'}}
              onClick={handleIncreaseGuests}
              disabled={guests >= MAX_GUESTS}
              className={guests >= MAX_GUESTS ? "disabled" : ""}
            ></button>
          </div>
        </div>
        <ButtonBook title={'book'} flag={false} size={''} height={'66px'} width={'40%'} />
      </div>

      <div className="calendar-months">
        <div className="months-container">
          <div className="month">
            <div className='month-nav'>
              <button style={{paddingLeft:'14px'}} onClick={prevMonths}></button>
              <h3>{months[firstMonth.month]} {firstMonth.year}</h3>
            </div>
            <table>
              <thead>
              <tr>
                {['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'].map(day => (
                  <th key={day}>{day}</th>
                ))}
              </tr>
              </thead>
              <tbody>
              {renderMonth(firstMonth.month, firstMonth.year).map((week, i) => (
                <tr key={`week-${i}`}>{week}</tr>
              ))}
              </tbody>
            </table>
          </div>
          <div className="month">
            <div className='month-nav'>
              <h3 style={{paddingLeft:'50px'}}>{months[secondMonth.month]} {secondMonth.year}</h3>
              <button style={{transform: 'rotate(180deg)', paddingLeft:'14px',paddingBottom:'3px'}} onClick={nextMonths}></button>
            </div>
            <table>
              <thead>
              <tr>
                {['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'].map(day => (
                  <th key={day}>{day}</th>
                ))}
              </tr>
              </thead>
              <tbody>
              {renderMonth(secondMonth.month, secondMonth.year).map((week, i) => (
                <tr key={`week-${i}`}>{week}</tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="calendar-actions">
        <button className="clear-dates" onClick={clearDates}>Clear dates</button>
        <button className="close-calendar" onClick={closeCalendar}>Close</button>
      </div>
    </div>
  );
};

export default Calendar;