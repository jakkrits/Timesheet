import { graphql } from 'react-apollo';
import userProfileGql from './userProfileGql.gql';

const withUserQuery = graphql(userProfileGql);

export default component => withUserQuery(component);
