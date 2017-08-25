import { Footer } from 'bloomer';

const AppFooter = () =>
  <Footer
    id="footer"
    style={{
      position: 'fixed',
      bottom: '0px',
      left: '0px',
      width: '100%',
      height: '80px'
    }}
  >
    <div className="container">
      <div className="content has-text-centered">
        <p>
          <strong>ChewLounge Timesheet</strong> by{' '}
          <a href="www.appillustrator.com">App Illustrator</a>
        </p>
        <p>
          <a className="icon" href="https://facebook.com/appillustrator">
            <i className="fa fa-facebook" />
          </a>
        </p>
      </div>
    </div>
  </Footer>;

export default AppFooter;
