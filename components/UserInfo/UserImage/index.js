import React from 'react';
import { graphql, gql } from 'react-apollo';
import PropTypes from 'prop-types';
import { Image } from 'bloomer';

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
    return <Image isSize="256x256" src={imageUrl} />;
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
