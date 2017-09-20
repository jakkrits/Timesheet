import withData from '../libraries/withData';
import DefaultCon from '../containers/Default';
import Timesheet from '../components/Timesheet';
// import Table from '../components//Table';

export default withData(props => (
  <DefaultCon {...props}>
    <Timesheet />
  </DefaultCon>
));
