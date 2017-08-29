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

  handleCancel = () => {
    this.setState({
      imageId: '',
      imageUrl: '',
      uploading: false
    });
  };

  render() {
    if (this.state.uploading) {
      return (
        <a className="button is-loading is-large is-unselectable">Loading</a>
      );
    }

    return (
      <div className="dropzone">
        <div className="box">
          {!this.state.imageId &&
            <Dropzone
              style={{ height: '300px' }}
              onDrop={this.onDrop}
              accept="image/*"
              multiple={false}
            >
              <p
                className="has-text-grey"
                style={{ position: 'relative', top: '40%' }}
              >
                วางรูปหรือคลิกเพื่ออัพโหลด
              </p>
              <div className="overlay" />
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
              <button onClick={this.handleCancel}>cancel</button>{' '}
            </span>}
        </div>
        <style jsx>{`
            a {
              margin: auto,
              width: 100%
            }
            .dropzone:hover .overlay {
              background: rgba(56, 62, 74, 0.50);
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
