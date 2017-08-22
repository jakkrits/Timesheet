import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import NProgress from 'nprogress';
import Router from 'next/router';
import App from '../components/App';
import Header from '../components/Header';

// eslint-disable-next-line
class Default extends React.Component {
  componentDidMount() {
    Router.onRouteChangeStart = url => {
      console.log(`Loading: ${url}`); // eslint-disable-line
      NProgress.start();
    };
    Router.onRouteChangeComplete = () => NProgress.done();
    Router.onRouteChangeError = () => NProgress.done();
  }

  render() {
    return (
      <App>
        <Helmet>
          <title>
            {this.props.title !== ''
              ? `${this.props.title} :: ChewLounge`
              : 'ChewLounge'}
          </title>
        </Helmet>
        <Header pathname={this.props.url.pathname} />
        {this.props.children}
      </App>
    );
  }
}

Default.propTypes = {
  title: PropTypes.string,
  url: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired
};

Default.defaultProps = {
  title: ''
};

export default Default;
