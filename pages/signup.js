import React from 'react';
import SignUpForm from '../components/SignUpForm';
import withData from '../libraries/withData';
import DefaultCon from '../containers/Default';
import Redirect from '../libraries/redirect';
import checkUserLoggedIn from '../libraries/checkUserLoggedIn';

// eslint-disable-next-line react/prefer-stateless-function
class Signup extends React.Component {
  static async getInitialProps(context, apollo) {
    const userExists = await checkUserLoggedIn(context, apollo);
    if (userExists) {
      Redirect(context, '/');
    }
  }
  render() {
    return (
      <DefaultCon title="Sign Up" {...this.props}>
        <SignUpForm />
      </DefaultCon>
    );
  }
}

export default withData(Signup);
