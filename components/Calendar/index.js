import React from 'react';
import ReactTable from 'react-table';
import PropTypes from 'prop-types';

// Render the Calendars
class Calendar extends React.Component {
  data = [
    {
      name: 'Tanner',
      age: 2,
      friend: {
        name: 'Jason',
        age: 29
      }
    }
  ];

  columns = [
    {
      Header: 'Name',
      accessor: 'name'
    },
    {
      Header: 'Age',
      accessor: 'age',
      Cell: props => <span className="number">{props.value}</span>
    },
    {
      id: 'friendName', // Required because our accessor is not a string
      Header: 'Friend Name',
      accessor: d => d.friend.name // Custom value accessors!
    },
    {
      Header: () => <span>Friend Age</span>, // Custom header components!
      accessor: 'friend.age'
    }
  ];
  render() {
    console.log('*******************');
    console.log(this.props);
    console.log('*******************');
    return (
      <div>
        <ReactTable data={this.data} columns={this.columns} />
      </div>
    );
  }
}

Calendar.propTypes = {
  props: PropTypes.shape({
    age: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired
  }).isRequired
};

export default Calendar;
