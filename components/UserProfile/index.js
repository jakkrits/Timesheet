import React from 'react';
import PropTypes from 'prop-types';
import { Columns, Column } from 'bloomer';
import connect from './store';

// eslint-disable-next-line
class UserInfo extends React.Component {
  render() {
    return (
      <Columns isCentered>
        <Column />
        <Column isSize="6">
          <h1>INFO OF USER HERE</h1>
        </Column>
        <Column />
      </Columns>
    );
  }
}

UserInfo.propTypes = {
  data: PropTypes.object.isRequired
};

export default connect(UserInfo);
