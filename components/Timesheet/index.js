import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import moment from 'moment';
import connect from './store';

class Timesheet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [{}]
    };
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
  render() {
    const { data } = this.state;
    // console.log(data);
    // console.log(this.props.data);
    console.log(moment().startOf('month'));
    console.log(moment().endOf('month'));
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
    console.warn('render after loading');
    return (
      <div>
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
              columns: [
                {
                  Header: 'Age',
                  accessor: 'age'
                },
                {
                  Header: 'Status',
                  accessor: 'status'
                }
              ]
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
