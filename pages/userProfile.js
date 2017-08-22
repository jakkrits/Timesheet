/* eslint-disable */
import React from 'react';
import withData from '../libraries/withData';
import DefaultCon from '../containers/Default';
// import checkUserLoggedIn from '../libraries/checkUserLoggedIn';
// import Redirect from '../libraries/redirect';

// eslint-disable-next-line react/prefer-stateless-function
class UserProfile extends React.Component {
  //   static async getInitialProps(context, apollo) {
  //     const userExists = await checkUserLoggedIn(context, apollo);
  //     if (!userExists) {
  //       Redirect(context, '/signin');
  //     }
  //   }

  render() {
      console.log(this.props);
    return (
      <DefaultCon title="Profile" {...this.props}>
        <h1>USER PROFILE</h1>
      </DefaultCon>
    );
  }
}

export default withData(UserProfile);
