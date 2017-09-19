import React from 'react';
import PropTypes from 'prop-types';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
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
  onRowClick = row => {
    console.log(row.document.timesheets);
  };
  showWorkCode = (cell, row) => {
    const timesheets = row.document.timesheets;
    //eslint-disable-next-line
    for (let i = 0; i <= timesheets.length; i += 1) {
      console.warn(i);
    }
  };
  renderDateColumns = days => {
    const columnDays = [];
    for (let i = 0; i < days.length; i += 1) {
      columnDays.push(
        <TableHeaderColumn dataField="workday" dataFormat={this.showWorkCode}>
          {thDate(days[i], 'D')}
        </TableHeaderColumn>
      );
    }
    return columnDays;
  };

  render() {
    const options = { onRowClick: this.onRowClick };
    const { data, days } = this.state;
    console.warn(data);
    const indexN = (cell, row, enumObject, index) => <div> {index + 1} </div>;
    const showBranch = (cell, row) => <div>{row.document.branch}</div>;

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
        <BootstrapTable
          data={data}
          options={options}
          striped
          hover
          condensed
          version="4"
        >
          <TableHeaderColumn dataField="any" dataFormat={indexN}>
            #
          </TableHeaderColumn>
          <TableHeaderColumn isKey dataField="id">
            {' '}
            รหัสพนักงาน{' '}
          </TableHeaderColumn>
          <TableHeaderColumn dataField="firstName">ชื่อ</TableHeaderColumn>
          <TableHeaderColumn dataField="lastName">นามสกุล</TableHeaderColumn>
          <TableHeaderColumn dataField="nickName">ชื่อเล่น</TableHeaderColumn>
          <TableHeaderColumn dataField="branch" dataFormat={showBranch}>
            สาขา
          </TableHeaderColumn>
          {this.renderDateColumns(days)}
        </BootstrapTable>
        <br />
      </div>
    );
  }
}

Timesheet.propTypes = {
  data: PropTypes.object.isRequired
};
export default connect(Timesheet);
