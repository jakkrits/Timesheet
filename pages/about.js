import withData from '../libraries/withData';
import DefaultCon from '../containers/Default';
import Timetest from '../components/Timesheet/Timesheet-Test';

export default withData(props => (
  <DefaultCon title="About" {...props}>
    <h1>ABOUT</h1>
    <Timetest />
  </DefaultCon>
));
