import React from 'react';
import SignInForm from '../components/SignInForm';
import withData from '../libraries/withData';
import DefaultCon from '../containers/Default';
import Redirect from '../libraries/redirect';
import checkUserLoggedIn from '../libraries/checkUserLoggedIn';
import { Link } from '../routes';

// eslint-disable-next-line react/prefer-stateless-function
class Signin extends React.Component {
  static async getInitialProps(context, apollo) {
    const userExists = await checkUserLoggedIn(context, apollo);
    if (userExists) {
      Redirect(context, '/');
    }
  }
  render() {
    return (
      <DefaultCon title="Sign In" {...this.props}>
        <SignInForm />
        <p>
          no account?{' '}
          <Link prefetch route="signup" passHref>
            <a>SignUp</a>
          </Link>
        </p>
      </DefaultCon>
    );
  }
}

export default withData(Signin);
