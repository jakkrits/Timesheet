import React from 'react';
import { graphql, gql } from 'react-apollo';
import { Container } from 'bloomer';
import Dropzone from 'react-dropzone';

class ImageUploader extends React.Component {
  static propTypes = {
    uploadImage: React.PropTypes.func.isRequired,
    userId: React.PropTypes.any.isRequired
  };

  state = {
    description: '',
    imageUrl: '',
    imageId: ''
  };
  onDrop = files => {
    // prepare form data, use data key!
    const data = new FormData();
    data.append('data', files[0]);

    // use the file endpoint
    fetch('https://api.graph.cool/file/v1/cj6qmk7l90vvf0152k5al8hn3', {
      method: 'POST',
      body: data
    })
      .then(response => response.json())
      .then(image => {
        this.setState({
          imageId: image.id,
          imageUrl: image.url
        });
      });
  };

  handlePost = async () => {
    const { imageId } = this.state;
    const userId = this.props.userId;
    await this.props.uploadImage({ variables: { userId, imageId } });

    window.location.pathname = '/';
  };

  render() {
    return (
      <Container>
        <div className="w-100 pa4 flex justify-center">
          <div style={{ maxWidth: 400 }} className="">
            <input
              className="w-100 pa3 mv2"
              value={this.state.description}
              placeholder="Description"
              onChange={e => this.setState({ description: e.target.value })}
            />
            {!this.state.imageId &&
              <Dropzone onDrop={this.onDrop} accept="image/*" multiple={false}>
                <div>Drop an image or click to choose</div>
              </Dropzone>}
            {this.state.imageUrl &&
              <img
                src={this.state.imageUrl}
                role="presentation"
                className="w-100 mv3"
                alt="user thumbnail"
              />}
            {this.state.description &&
              this.state.imageUrl &&
              <button
                className="pa3 bg-black-10 bn dim ttu pointer"
                onClick={this.handlePost}
              >
                Post
              </button>}
          </div>
        </div>
      </Container>
    );
  }
}

const addMutation = gql`
  mutation uploadImage($userId: ID!, $imageId: ID!) {
    createDocument(userId: $userId, imageId: $imageId) {
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
