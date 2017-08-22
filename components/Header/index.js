import PropTypes from 'prop-types';
import LinkList from '../../components/LinkList';
import connect from './store';

const Header = ({ pathname, authenticated, actions: { logout } }) =>
  <LinkList
    pathname={pathname}
    authenticated={authenticated}
    logout={logout}
  />;

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
