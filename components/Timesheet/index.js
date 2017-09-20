import React from 'react';
import PropTypes from 'prop-types';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import moment from 'moment';
import _ from 'lodash';
import connect from './store';
import { daysInAMonth, thDate } from '../../libraries/date';

class Timesheet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      days: []
    };
  }
  componentDidMount() {
    this.state.days = daysInAMonth(
      moment().startOf('month'),
      moment().endOf('month')
    );
  }

  onRowClick = row => {
    console.log(row.document.timesheets);
  };

  showBranch = (cell, row) => <div>{_.get(row, 'document.branch')}</div>; // eslint-disable-line

  showWorkCode = (cell, row) => {
    const timesheets = row.document.timesheets;
    //eslint-disable-next-line
    for (let i = 0; i < timesheets.length; i += 1) {
      // console.warn(timesheets[i].workday);
    }
    return <p>X</p>;
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
    const { days } = this.state;
    const indexN = (cell, row, enumObject, index) => <div> {index + 1} </div>;
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
    const allUsers = this.props.data.allUsers;
    return (
      <div>
        <p>Employees Timesheet: Month - {thDate(days[0], 'MMMM')}</p>
        <BootstrapTable
          data={allUsers}
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
            ID{' '}
          </TableHeaderColumn>
          <TableHeaderColumn dataField="firstName">Name</TableHeaderColumn>
          <TableHeaderColumn dataField="lastName">Lastname</TableHeaderColumn>
          <TableHeaderColumn dataField="nickName">Nickname</TableHeaderColumn>
          <TableHeaderColumn dataField="branch" dataFormat={this.showBranch}>
            Branch
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
