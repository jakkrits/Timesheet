/* eslint max-len: 0 */
import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import _ from 'lodash';

//eslint-disable-next-line
export default class Table extends React.Component {
  render() {
    const testData = [
      {
        id: '993',
        firstName: 'jakk',
        lastName: 'sutt',
        animal: {
          cat: 'kitty'
        }
      },
      {
        id: '923',
        firstName: 'xiwl',
        lastName: 'ss2tt',
        animal: {
          cat: 'city'
        }
      },
      {
        id: '913',
        firstName: 'colby',
        lastName: 'bryan',
        animal: {
          cat: 'atom'
        }
      }
    ];
    const renderCustom = (cell, row, extra) => {
      console.log(extra);
      const value = _.get(row, extra.path);
      return <div>{value}</div>;
    };

    const columns = [
      { path: 'id', title: 'ID', isKey: true },
      { path: 'animal.cat', title: 'Cat' }
    ];

    const tableColumn = _.map(columns, column => (
      <TableHeaderColumn
        dataField={column.path}
        dataFormat={renderCustom}
        formatExtraData={column}
        isKey={column.isKey}
        key={column.path}
      >
        {column.title}
      </TableHeaderColumn>
    ));
    return (
      <BootstrapTable data={testData} insertRow>
        {tableColumn}
      </BootstrapTable>
    );
  }
}
