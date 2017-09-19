import React from 'react';
import PropTypes from 'prop-types';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
// import ReactTable from 'react-table';
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
  indexN = (cell, row, enumObject, index) => <div> {index + 1} </div>;

  testDoc = (cell, row, enumObject, index) => {
    console.log(row.document, index);
    return <div> {index % 2} </div>;
  };
  renderDateColumns = days => {
    const columnDays = [];
    for (let i = 0; i < days.length; i += 1) {
      columnDays.push(
        <TableHeaderColumn dataField="workday">
          {thDate(days[i], 'D')}
        </TableHeaderColumn>
      );
    }
    console.log(columnDays);
    return columnDays;
  };

  render() {
    const options = { onRowClick: this.onRowClick };
    const { data, days } = this.state;
    const tdAttr = {
      'data-attr1': 'value1',
      'data-attr2': 'value2'
    };
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

    console.log('DATA: \n');
    console.log(data);
    console.warn('*****');
    console.warn(days);
    console.log(this.props.data);
    // console.error(data[0].document.timesheets);
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
          <TableHeaderColumn dataField="any" dataFormat={this.indexN}>
            #
          </TableHeaderColumn>
          <TableHeaderColumn dataField="workday" dataFormat={this.testDoc}>
            TEST
          </TableHeaderColumn>
          <TableHeaderColumn width="10%" isKey dataField="id">
            รหัสพนักงาน
          </TableHeaderColumn>
          <TableHeaderColumn width="8%" dataField="firstName">
            ชื่อ
          </TableHeaderColumn>
          <TableHeaderColumn width="8%" dataField="lastName">
            นามสกุล
          </TableHeaderColumn>
          <TableHeaderColumn width="8%" dataField="nickName" tdAttr={tdAttr}>
            ชื่อเล่น
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
