/* eslint-disable */
import React from 'react';
import withData from '../libraries/withData';
import DefaultCon from '../containers/Default';
import checkUserLoggedIn from '../libraries/checkUserLoggedIn';
import Redirect from '../libraries/redirect';
import UserInfo from '../components/UserInfo';

// eslint-disable-next-line react/prefer-stateless-function
class UserProfile extends React.Component {
    static async getInitialProps(context, apollo) {
      const userExists = await checkUserLoggedIn(context, apollo);
      if (!userExists) {
        Redirect(context, '/signin');
      }
    }

  render() {
    return (
      <DefaultCon title="Profile" {...this.props}>
        <UserInfo />
      </DefaultCon>
    );
  }
}

export default withData(UserProfile);
