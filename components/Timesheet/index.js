/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import moment from 'moment';
import { format } from 'date-fns';
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
    this.state.days = daysInAMonth(moment().startOf('month'), moment().endOf('month'));
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

  dates = [
    {
    Header: '1',
    id: 'day1'
  }, {
    Header: '2',
    id: 'day2'
  }, {
    Header: '3',
    id: 'day3'
  }]

  renderDate = () => ([...this.dates]);

  render() {
    const { data, days } = this.state;
    console.error(days.length);
    console.log('Days this month: ', days);
    const formatted = format(days[0]);
    console.log(formatted);
    console.log(days[0]);
    console.log(thDate(days[28], 'D'));
    console.log(thDate(days[28], 'MMM'))
    console.log(thDate(days[23], 'DD MMMM'))
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
    console.log(this.props.data.allUsers);
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
            },
            
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
