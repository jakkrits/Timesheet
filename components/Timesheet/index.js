import React from 'react';
import ReactTable from 'react-table';
import { makeData, Logo, Tips } from './utils';

class Timesheet extends React.Component {
  constructor() {
    super();
    this.state = {
      data: makeData()
    };
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
    return (
      <div>
        <ReactTable
          filterable
          defaultFilterMethod={(filter, row) =>
            String(row[filter.id]) === filter.value}
          data={data}
          columns={[
            {
              Header: 'Name',
              columns: [
                {
                  Header: 'First Name',
                  accessor: 'firstName',
                  Cell: this.renderEditable,
                  filterMethod: (filter, row) =>
                    row[filter.id].startsWith(filter.value) ||
                    row[filter.id].endsWith(filter.value)
                },
                {
                  Header: 'Last Name',
                  id: 'lastName',
                  accessor: d => d.lastName,
                  Cell: this.renderEditable,
                  filterMethod: (filter, row) =>
                    row[filter.id].startsWith(filter.value) ||
                    row[filter.id].endsWith(filter.value)
                }
              ]
            },
            {
              Header: 'Info',
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
            },
            {
              Header: 'Stats',
              columns: [
                {
                  Header: 'Visits',
                  accessor: 'visits'
                }
              ]
            }
          ]}
          defaultPageSize={20}
          className="-striped -highlight"
        />
        <br />
        <Tips />
        <Logo />
      </div>
    );
  }
}
export default Timesheet;
