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
    return (
      <Columns isCentered isDesktop>
        <Column />
        <Column isSize="1/3" hasTextAlign="centered">
          {data.user.image === null
            ? <ImageUploader userId={data.user.id} />
            : <UserImage userId={data.user.id} />}
        </Column>
        <Column isSize="1/3" hasTextAlign="centered">
          <h2>Column 2</h2>
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
