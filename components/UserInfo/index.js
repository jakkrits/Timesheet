import React from 'react';
import PropTypes from 'prop-types';
import { Columns, Column } from 'bloomer';
import connect from './store';
import UserImage from './UserImage';
import ImageUploader from './ImageUploader';

// eslint-disable-next-line
class UserInfo extends React.Component {
  render() {
    const { data } = this.props;
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
    console.error('*******************');
    console.log(this.props);
    console.error('*******************');
    return (
      <Columns isCentered>
        <Column isSize="2" />
        <Column isSize="4">
          <h1>INFO OF USER HERE</h1>

          {data.user.image === null
            ? <ImageUploader />
            : <UserImage userId={data.user.id} />}
        </Column>
        <Column isSize="4">
          <h2>Column 2</h2>
        </Column>
        <Column isSize="2" />
      </Columns>
    );
  }
}

UserInfo.propTypes = {
  data: PropTypes.object.isRequired
};

export default connect(UserInfo);
