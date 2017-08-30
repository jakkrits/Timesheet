import React from 'react';
import PropTypes from 'prop-types';
import connect from './store';
import UserImage from './UserImage';
import ImageUploader from './ImageUploader';
// eslint-disable-next-line
class UserInfo extends React.Component {
  render() {
    console.error(this.props); // eslint-disable-line
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
      <div className="columns is-desktop">
        <div className="column is-2" />
        <div className="column is-4">
          <div className="card">
            <div className="card-image">
              {data.user.image === null ? (
                <ImageUploader userId={data.user.id} />
              ) : (
                <UserImage userId={data.user.id} />
              )}
            </div>
            <div className="card-content">
              {' '}
              <div className="media">
                <div className="media-left">
                  <span className="tag is-danger">{data.user.role}</span>
                </div>
                <div className="media-content">
                  <p className="title is-4">
                    {data.user.firstName} {''} {data.user.lastName}
                  </p>
                  <p className="subtitle is-6">{`(${data.user.nickName})`}</p>
                </div>
              </div>{' '}
              <div className="content">
                {' '}
                <p>{data.user.document.branch}</p>
                <p>{data.user.email}</p>
                <span className="icon is-medium">
                  <i className="fa fa-mobile" />
                </span>
                <small>{data.user.document.cellPhone}</small>
              </div>
            </div>
          </div>
        </div>
        <div className="column is-4">
          <p>Column 2</p>
        </div>
        <div className="column is-2" />
      </div>
    );
  }
}

UserInfo.propTypes = {
  data: PropTypes.object.isRequired
};

export default connect(UserInfo);
