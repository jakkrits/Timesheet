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
  i = 5 
  dates = [
    {
    Header: props => <span>{thDate(this.state.days[this.i], 'DMMM')}</span>,
    id: '1',
    accessor: d =>  { 
      console.log('-->', thDate(this.state.days[this.i], 'DMMM'))
      const { timesheets } = d.document
      console.log(thDate(timesheets[`${this.i}`].workday, 'DMMM'))
      console.log(timesheets[`${this.i}`].workday) 
      return timesheets[`${this.i}`] && thDate(timesheets[`${this.i}`].workday, 'DMMM') === thDate(this.state.days[this.i], 'DMMM') ? timesheets[`${this.i}`].timeCode : 'ควย' 
    }
  }, {
    Header: '2',
    id: '2'
  }, {
    Header: '3',
    id: '3'
  }, {
    Header: '4',
    id: '4'
  }, {
    Header: '5',
    id: '5'
  }, {
    Header: '6',
    id: '6'
  }, {
    Header: '7',
    id: '7'
  }, {
    Header: '8',
    id: '8'
  }, {
    Header: '9',
    id: '9'
  }, {
    Header: '10',
    id: '10'
  }, {
    Header: '11',
    id: '11'
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
    console.warn(data);
    console.error(thDate(data[0].document.timesheets[0].workday, 'DMMM'));
    console.error(thDate(data[0].document.timesheets[1].workday, 'DMMM'));
    console.error(thDate(data[0].document.timesheets[2].workday, 'DMMM'));
    console.error(thDate(data[0].document.timesheets[3].workday, 'DMMM'));
    console.error(thDate(data[0].document.timesheets[4].workday, 'DMMM'));
    console.error(thDate(data[0].document.timesheets[5].workday, 'DMMM'));
    console.error(thDate(data[0].document.timesheets[6].workday, 'DMMM'));
    console.warn(data[0].document.timesheets[0])
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
