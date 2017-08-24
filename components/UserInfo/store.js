import { graphql } from 'react-apollo';
import userInfoGql from './userInfoGql.gql';

const withUserQuery = graphql(userInfoGql, {
  options: {
    fetchPolicy: 'network-only'
  }
});

export default component => withUserQuery(component);
