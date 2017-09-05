import withData from '../libraries/withData';
import DefaultCon from '../containers/Default';
import Timesheet from '../components/Timesheet';

export default withData(props => (
  <DefaultCon {...props}>
    <h1>Home Page</h1>
    <Timesheet />
  </DefaultCon>
));
