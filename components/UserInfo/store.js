import { graphql } from 'react-apollo';
import userInfoGql from './userInfoGql.gql';

const withUserQuery = graphql(userInfoGql);

export default component => withUserQuery(component);
