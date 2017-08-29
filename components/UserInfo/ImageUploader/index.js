import React from 'react';
import PropTypes from 'prop-types';
import { graphql, gql } from 'react-apollo';
import Dropzone from 'react-dropzone';

class ImageUploader extends React.Component {
  static propTypes = {
    uploadImage: PropTypes.func.isRequired,
    userId: PropTypes.any.isRequired
  };

  state = {
    imageUrl: '',
    imageId: '',
    uploading: false
  };

  onDrop = files => {
    // prepare form data, use data key!
    const data = new FormData();
    data.append('data', files[0]);
    this.setState({ uploading: true });
    // use the file endpoint
    fetch('https://api.graph.cool/file/v1/cj6qmk7l90vvf0152k5al8hn3', {
      method: 'POST',
      body: data
    })
      .then(response => response.json())
      .then(image => {
        this.setState({
          imageId: image.id,
          imageUrl: image.url,
          uploading: false
        });
      })
      .catch(() => this.setState({ uploading: false }));
  };

  handlePost = async () => {
    const { imageId } = this.state;
    const userId = this.props.userId;
    await this.props.uploadImage({ variables: { userId, imageId } });
    window.location.pathname = '/profile';
  };

  render() {
    if (this.state.uploading) {
      return (
        <a className="button is-loading is-large is-unselectable">Loading</a>
      );
    }

    return (
      <div>
        <div className="box">
          {!this.state.imageId &&
            <Dropzone onDrop={this.onDrop} accept="image/*" multiple={false}>
              <p
                className="has-text-grey"
                style={{ position: 'relative', top: '40%' }}
              >
                วางรูปหรือคลิกเพื่ออัพโหลด
              </p>
            </Dropzone>}
          {this.state.imageUrl &&
            <img
              src={this.state.imageUrl}
              role="presentation"
              className="w-100 mv3"
              alt="user thumbnail"
            />}
          {this.state.imageId &&
            this.state.imageUrl &&
            <span>
              {' '}<button
                className="pa3 bg-black-10 bn dim ttu pointer"
                onClick={this.handlePost}
              >
                อัพโหลด
              </button>{' '}
              <button>cancel</button>{' '}
            </span>}
        </div>
        <style jsx>{`
            a {
              margin: auto,
              width: 100%
            }
        `}</style>
      </div>
    );
  }
}

const addMutation = gql`
  mutation uploadImage($userId: ID!, $imageId: ID!) {
    updateUser(id: $userId, imageId: $imageId) {
      id
      image {
        url
      }
    }
  }
`;

const PageWithMutation = graphql(addMutation, { name: 'uploadImage' })(
  ImageUploader
);

export default PageWithMutation;
