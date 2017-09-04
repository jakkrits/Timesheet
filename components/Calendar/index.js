import React from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

// const allViews = Object.keys(BigCalendar.views).map(k => BigCalendar.views[k]);
/* const events = [
  {
    title: 'All Day Event',
    allDay: true,
    start: new Date(2017, 10, 0),
    end: new Date(2017, 10, 1)
  },
  {
    title: 'X',
    allDay: true,
    start: moment(this.props.workdays[0]),
    
  }
]; */

const Calendar = React.createClass({
  render() {
    moment.locale('th');
    moment().format('LL');
    console.log(this.props);
    const testDate = new Date(
      this.props.workdays[0].workday
    ).toLocaleDateString('th-Th');
    console.log(testDate);
    console.log(this.props.workdays[1].workday);
    console.log(this.props.workdays[1].timeCode);
    return (
      <BigCalendar
        {...this.props}
        events={[
          {
            title: this.props.workdays[0].timeCode,
            allDay: true,
            start: this.props.workdays[0].workday,
            end: this.props.workdays[0].workday
          },
          {
            title: this.props.workdays[1].timeCode,
            allDay: true,
            start: this.props.workdays[1].workday,
            end: this.props.workdays[1].workday
          },
          {
            title: this.props.workdays[2].timeCode,
            allDay: true,
            start: this.props.workdays[2].workday,
            end: this.props.workdays[2].workday
          },
          {
            title: this.props.workdays[3].timeCode,
            allDay: true,
            start: this.props.workdays[3].workday,
            end: this.props.workdays[3].workday
          },
          {
            title: this.props.workdays[4].timeCode,
            allDay: true,
            start: this.props.workdays[4].workday,
            end: this.props.workdays[4].workday
          },
          {
            title: this.props.workdays[5].timeCode,
            allDay: true,
            start: this.props.workdays[5].workday,
            end: this.props.workdays[5].workday
          },
          {
            title: this.props.workdays[6].timeCode,
            allDay: true,
            start: this.props.workdays[6].workday,
            end: this.props.workdays[6].workday
          }
        ]}
        views={['month']}
        defaultDate={new Date()}
      />
    );
  }
});

export default Calendar;
