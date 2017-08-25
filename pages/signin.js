import React from 'react';
import { Columns, Column } from 'bloomer';
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
      <DefaultCon title="ล็อคอิน" {...this.props}>
        <Columns isCentered>
          <Column />
          <Column isSize="4" hasTextAlign="centered">
            <SignInForm />
            <hr />
            <p>
              ต้องการลงทะเบียน?{' '}
              <Link prefetch route="signup" passHref>
                <a>สมัครใช้งาน</a>
              </Link>
            </p>
          </Column>
          <Column />
        </Columns>
      </DefaultCon>
    );
  }
}

export default withData(Signin);
