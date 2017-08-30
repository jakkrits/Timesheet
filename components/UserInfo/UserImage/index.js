import React from 'react';
import { graphql, gql, compose } from 'react-apollo';
import PropTypes from 'prop-types';
import { CoverImage } from '../../Theme';

const getPhotoUrl = (url, width) => {
  const imageSize = `x${width}`;
  return `${url.replace(
    'https://files.graph.cool/',
    'https://images.graph.cool/'
  )}/${imageSize}`;
};

// eslint-disable-next-line
class UserImage extends React.Component {
  removeUserImage = () => {
    const imageId = this.props.getImage.user.image.id;
    this.props
      .removeImage({ variables: { imageId } })
      .then(() => console.log('DELETED')); // eslint-disable-line 
    window.location.pathname = '/profile'; // TODO: // Workaround Graphcool issue
  };

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
      <figure className="avatar is-square">
        <CoverImage src={imageUrl} alt="thumbnail" />
        <div className="overlay" />
        <div className="hover_delete_button">
          {/* eslint-disable-next-line */}
          <a role="presentation" onClick={this.removeUserImage}>
            {' '}
            Delete{' '}
          </a>
        </div>
        <style jsx>{`
          a {
            color: orange;
          }
          .avatar: hover .overlay {
            background: rgba(56, 62, 74, 0.5);
          }
          .overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0);
            transition: background 0.5s ease;
          }
          .hover_delete_button {
            position: absolute;
            width: 100%;
            left: 0;
            top: 50%;
            text-align: center;
            opacity: 0;
            transition: opacity 0.35s ease;
          }
          .hover_delete_button a {
            width: 200px;
            padding: 12px 48px;
            text-align: center;
            color: white;
            border: solid 2px white;
            z-index: 1;
          }
          .avatar:hover .hover_delete_button {
            opacity: 1;
          }
        `}</style>
      </figure>
    );
  }
}

UserImage.propTypes = {
  getImage: PropTypes.object.isRequired,
  removeImage: PropTypes.func.isRequired,
  userId: PropTypes.any.isRequired
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

const addMutation = gql`
  mutation removeImage($imageId: ID!) {
    deleteFile(id: $imageId) {
      id
    }
  }
`;

const PageWithImageQuery = compose(
  graphql(imageQuery, { name: 'getImage' }),
  graphql(addMutation, { name: 'removeImage' })
)(UserImage);

export default PageWithImageQuery;
