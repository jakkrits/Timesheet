import React from 'react';
import PropTypes from 'prop-types';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import moment from 'moment';
import _ from 'lodash';
import connect from './store';
import { daysInAMonth, thDate } from '../../libraries/date';
import mockData from './mockdata.json';

class Timetest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      days: [],
      allUsers: mockData.data.allUsers
    };
  }
  componentDidMount() {
    this.state.days = daysInAMonth(
      moment().startOf('month'),
      moment().endOf('month')
    );
  }

  render() {
    const options = { onRowClick: this.onRowClick };
    const { days, allUsers } = this.state;
    const indexN = (cell, row, enumObject, index) => <div> {index + 1} </div>;
    // eslint-disable-next-line
    const showWorkCode = (cell, row) => {
      const timesheets = _.get(row, 'document.timesheets');
      const workdays = [];
      _.map(timesheets, timesheet => workdays.push(timesheet.workday));
      console.warn(workdays);
    };
    const renderDateColumns = myDays => {
      const columnDays = [];
      for (let i = 0; i < days.length; i += 1) {
        columnDays.push(
          <TableHeaderColumn
            key={i}
            dataField="workday"
            dataFormat={showWorkCode}
          >
            {thDate(myDays[i], 'D')}
          </TableHeaderColumn>
        );
      }
      return columnDays;
    };

    return (
      <div>
        <p>Employees Timesheet: Month - {thDate(days[0], 'MMMM')}</p>
        <BootstrapTable
          data={allUsers}
          options={options}
          striped
          hover
          version="4"
        >
          <TableHeaderColumn dataField="any" dataFormat={indexN}>
            #
          </TableHeaderColumn>
          <TableHeaderColumn isKey dataField="id">
            {' '}
            ID{' '}
          </TableHeaderColumn>
          <TableHeaderColumn width="150px" dataField="nickName">
            Nickname
          </TableHeaderColumn>
          {renderDateColumns(days)}
        </BootstrapTable>
        <br />
      </div>
    );
  }
}

Timetest.propTypes = {
  data: PropTypes.object.isRequired
};
export default connect(Timetest);
