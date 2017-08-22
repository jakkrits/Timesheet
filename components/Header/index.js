import React from 'react';
import PropTypes from 'prop-types';
import LinkList from '../../components/LinkList';
import connect from './store';

// eslint-disable-next-line
class Header extends React.Component {
  render() {
    const { pathname, authenticated, actions: { logout } } = this.props;
    return (
      <LinkList
        pathname={pathname}
        authenticated={authenticated}
        logout={logout}
      />
    );
  }
}
Header.defaultProps = {
  authenticated: false
};

Header.propTypes = {
  pathname: PropTypes.string.isRequired,
  authenticated: PropTypes.bool,
  actions: PropTypes.shape({
    logout: PropTypes.func.isRequired
  }).isRequired
};

export default connect(Header);
