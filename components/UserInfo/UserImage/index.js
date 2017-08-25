import React from 'react';
import { graphql, gql } from 'react-apollo';
import PropTypes from 'prop-types';

const getPhotoUrl = (url, width) => {
  const imageSize = `x${width}`;
  return `${url.replace(
    'https://files.graph.cool/',
    'https://images.graph.cool/'
  )}/${imageSize}`;
};

// eslint-disable-next-line
class UserImage extends React.Component {
  render() {
    if (this.props.getImage.loading) {
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
    const imageUrl = getPhotoUrl(this.props.getImage.user.image.url, '256');
    return (
      <div className="card">
        <div className="card-image">
          <figure className="is-square">
            <img
              style={{
                borderRadius: '50%',
                objectFit: 'cover',
                height: '100%',
                position: 'relative'
              }}
              src={imageUrl}
              alt="thumbnail"
            />
          </figure>
        </div>
        <div className="card-content">
          <div className="media">
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
          </div>

          <div className="content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
            nec iaculis mauris. <a>@bulmaio</a>.
            <a>#css</a> <a>#responsive</a>
            <br />
            <small>11:09 PM - 1 Jan 2016</small>
          </div>
        </div>
      </div>
    );
  }
}

UserImage.propTypes = {
  getImage: PropTypes.object.isRequired
};

const imageQuery = gql`
  query getImage {
    user {
      id
      image {
        id
        url
        secret
      }
    }
  }
`;

const PageWithImageQuery = graphql(imageQuery, { name: 'getImage' })(UserImage);

export default PageWithImageQuery;
