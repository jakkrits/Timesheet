import PropTypes from 'prop-types';
import { Button } from 'bloomer';
import { Link } from '../../routes';

const LinkList = ({ pathname, authenticated, logout }) =>
  <nav>
    <Link prefetch href="/" passHref>
      <a active={pathname === '/'}>Main Page</a>
    </Link>
    {!authenticated &&
      <Link prefetch route="signin" passHref>
        <a active={pathname === '/sign_in'}>SignIn</a>
      </Link>}
    {!authenticated &&
      <Link prefetch route="signup" passHref>
        <a active={pathname === '/sign_up'}>SignUp</a>
      </Link>}
    {authenticated &&
      <Link prefetch route="userProfile" passHref>
        <a active={pathname === '/profile'}>User Profile</a>
      </Link>}
    {authenticated &&
      <Button
        role="link"
        href="#"
        onClick={() => logout()}
        active={pathname === '/sign_up'}
      >
        LogOut
      </Button>}
  </nav>;

LinkList.propTypes = {
  pathname: PropTypes.string.isRequired,
  authenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired
};

export default LinkList;
