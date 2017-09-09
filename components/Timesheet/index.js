import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import moment from 'moment';
import connect from './store';
import { daysInAMonth, thDate } from '../../libraries/date';

class Timesheet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [{}],
      days: []
    };
  }
  componentDidMount() {
    this.state.days = daysInAMonth(
      moment().startOf('month'),
      moment().endOf('month')
    );
  }
  componentWillReceiveProps() {
    this.state.data = this.props.data.allUsers;
  }
  renderEditable = cellInfo => (
    <div
      style={{ backgroundColor: '#fafafa' }}
      contentEditable
      suppressContentEditableWarning
      onBlur={e => {
        const data = [...this.state.data];
        data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
        this.setState({ data });
      }}
      // eslint-disable-next-line
      dangerouslySetInnerHTML={{
        __html: this.state.data[cellInfo.index][cellInfo.column.id]
      }}
    />
  );

  renderDate = () => {
    const dates = [];
    const availableTimesheets = [];
    for (let i = 0; i < this.state.days.length; i += 1) {
      dates.push({
        Header: props => <span>{thDate(this.state.days[i], 'DMMM')}</span>, // eslint-disable-line
        id: `${i}`,
        accessor: d => {
          const { timesheets } = d.document;
          if (timesheets[i]) {
            availableTimesheets.push(thDate(timesheets[i].workday, 'DMMM'));
          }
          // console.error(availableTimesheets);
          // eslint-disable-next-line
          for (const day in this.state.days) {
            const matchDay = thDate(this.state.days[day], 'DMMM');
            // console.warn(matchDay);
            if (`${matchDay}` === `${availableTimesheets[i]}`) {
              return timesheets[i].timeCode;
            }
          }
          return '-';
        }
      });
    }
    console.log(dates);
    return dates;
  };

  render() {
    const { data, days } = this.state;
    if (this.props.data.loading) {
      return (
        <div className="box">
          <a
            className="button is-primary is-loading is-large is-outlined is-unselectable"
            style={{ margin: 'auto', width: '100%' }}
          >
            Loading
          </a>
        </div>
      );
    }
    return (
      <div>
        <p>ตารางทำงานพนักงาน เดือน{thDate(days[0], 'MMMM')}</p>
        <ReactTable
          filterable
          defaultFilterMethod={(filter, row) =>
            String(row[filter.id]) === filter.value}
          data={data}
          columns={[
            {
              Header: 'พนักงาน',
              columns: [
                {
                  Header: 'รหัสพนักงาน',
                  id: 'id',
                  accessor: d => d.id,
                  filterMethod: (filter, row) =>
                    row[filter.id].startsWith(filter.value) ||
                    row[filter.id].endsWith(filter.value)
                },
                {
                  Header: 'ชื่อ',
                  accessor: 'firstName',
                  Cell: this.renderEditable,
                  filterMethod: (filter, row) =>
                    row[filter.id].startsWith(filter.value) ||
                    row[filter.id].endsWith(filter.value)
                },
                {
                  Header: 'นามสกุล',
                  id: 'lastName',
                  accessor: d => d.lastName,
                  Cell: this.renderEditable,
                  filterMethod: (filter, row) =>
                    row[filter.id].startsWith(filter.value) ||
                    row[filter.id].endsWith(filter.value)
                },
                {
                  Header: 'ชื่อเล่น',
                  accessor: 'nickName',
                  Cell: this.renderEditable,
                  filterMethod: (filter, row) =>
                    row[filter.id].startsWith(filter.value) ||
                    row[filter.id].endsWith(filter.value)
                }
              ]
            },
            {
              Header: 'วันทำงาน',
              columns: this.renderDate()
            }
          ]}
          defaultPageSize={15}
          className="-striped -highlight"
        />
        <br />
      </div>
    );
  }
}

Timesheet.propTypes = {
  data: PropTypes.object.isRequired
};
export default connect(Timesheet);
