import { graphql } from 'react-apollo';
import employeesGql from './employeesGql.gql';

const withEmployeesQuery = graphql(employeesGql, {
  options: {
    fetchPolicy: 'network-only'
  }
});

export default component => withEmployeesQuery(component);
