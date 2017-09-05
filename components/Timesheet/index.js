import React from 'react';
import * as Table from 'reactabular-table';

const rows = [
  {
    id: 100,
    name: 'Adam',
    dad: 'John',
    lovesBeeGees: true
  },
  {
    id: 101,
    name: 'Brian',
    dad: 'George',
    lovesBeeGees: false
  }
];

const columns = [
  {
    property: 'name',
    header: {
      label: 'Name'
    }
  },
  {
    property: 'dad',
    header: {
      label: 'Dad'
    }
  }
];
// eslint-disable-next-line
class Timesheet extends React.Component {
  render() {
    return (
      <Table.Provider
        className="pure-table pure-table-striped"
        columns={columns}
      >
        <Table.Header />

        <Table.Body rows={rows} rowKey="id" />
      </Table.Provider>
    );
  }
}
export default Timesheet;
