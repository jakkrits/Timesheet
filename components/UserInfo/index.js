import React from 'react';
import PropTypes from 'prop-types';
import { Columns, Column } from 'bloomer';
import connect from './store';
import UserImage from './UserImage';
import ImageUploader from './ImageUploader';
// eslint-disable-next-line
class UserInfo extends React.Component {
  render() {
    console.error(this.props);
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
        <Column isSize="1/3">
          <div className="card">
            <div className="card-image">
              {data.user.image === null
                ? <ImageUploader userId={data.user.id} />
                : <UserImage userId={data.user.id} />}
            </div>
            <div className="card-content">
              {' '}<div className="media">
                <div className="media-left">
                  <span className="tag is-danger">
                    {data.user.role}
                  </span>
                </div>
                <div className="media-content">
                  <p className="title is-4">
                    {data.user.firstName} {''} {data.user.lastName}
                  </p>
                  <p className="subtitle is-6">
                    {`(${data.user.nickName})`}
                  </p>
                </div>
              </div>{' '}
              <div className="content">
                {' '}<span className="icon is-medium">
                  <i className="fa fa-mobile" />
                </span>
                <small>{data.user.document.cellPhone}</small>
              </div>
            </div>
          </div>
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
