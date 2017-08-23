import React from 'react';
import PropTypes from 'prop-types';
import { Columns, Column } from 'bloomer';
import connect from './store';

// eslint-disable-next-line
class UserInfo extends React.Component {
  render() {
    const { data } = this.props;
    console.log(this.props.data);
    if (data.loading) {
      // return <Loading />;
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
