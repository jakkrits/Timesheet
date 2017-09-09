import React from 'react';
import PropTypes from 'prop-types';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

// eslint-disable-next-line
class Calendar extends React.Component {
  render() {
    moment.locale('th');
    moment().format('LL');
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
}

Calendar.defaultProps = {
  timeCode: '-'
};

Calendar.propTypes = {
  workdays: PropTypes.array.isRequired,
  timeCode: PropTypes.string
};

export default Calendar;
