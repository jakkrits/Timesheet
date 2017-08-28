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
          <div className="card">
            <div className="card-image">
              {data.user.image === null
                ? <ImageUploader userId={data.user.id} />
                : <UserImage userId={data.user.id} />}
            </div>
            <div className="card-content">
              {' '}<div className="media">
                <div className="media-left">
                  <figure className="image is-48x48">
                    <img
                      src="http://bulma.io/images/placeholders/96x96.png"
                      alt="placeholderhere"
                    />
                  </figure>
                </div>
                <div className="media-content">
                  <p className="title is-4">John Smith</p>
                  <p className="subtitle is-6">@johnsmith</p>
                </div>
              </div>{' '}
              <div className="content">
                {' '}Lorem ipsum dolor sit amet, consectetur adipiscing
                elit.Phasellus nec iaculis mauris. <a> @bulmaio </a>.
                <a>#css</a> <a>#responsive</a> <br />{' '}
                <small>11:09 PM - 1 Jan 2016</small>{' '}
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
