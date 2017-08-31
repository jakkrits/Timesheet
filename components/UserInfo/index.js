import React from 'react';
import PropTypes from 'prop-types';
import connect from './store';
import UserImage from './UserImage';
import ImageUploader from './ImageUploader';
// eslint-disable-next-line
class UserInfo extends React.Component {
  showDate = date => {
    const dateString = new Date(date);
    return `${dateString.toLocaleDateString('th-TH')}`;
  };

  render() {
    const { loading } = this.props.data;
    const {
      id,
      firstName,
      lastName,
      nickName,
      role,
      email,
      image
    } = this.props.data.user;
    console.log(this.props.data.user.document); // eslint-disable-line
    const {
      branch,
      cellPhone,
      dateOfBirth,
      idCardNumber,
      department,
      shift,
      employedDate,
      savingsAccountID,
      savingsBank,
      leaveWithPay,
      vacation
    } = this.props.data.user.document;
    if (loading) {
      // return <Loading />;
      return (
        <div className="box">
          <a
            className="button is-primary is-loading is-large is-outlined is-unselectable"
            style={{ margin: 'auto', width: '100%' }}
          >
            Loading
          </a>
        </div>
      );
    }
    return (
      <div className="columns is-desktop">
        <div className="column is-2" />
        <div className="column is-4">
          <div className="card">
            <div className="card-image">
              {image === null ? (
                <ImageUploader userId={id} />
              ) : (
                <UserImage userId={id} />
              )}
            </div>
            <div className="card-content">
              {' '}
              <div className="media">
                <div className="media-content">
                  <p className="title is-4">
                    {firstName} {''} {lastName}
                  </p>
                  <p className="subtitle is-8">{`(${nickName})`}</p>
                </div>
                <div className="media-center">
                  <span className="tag is-danger">{role}</span>
                </div>
              </div>{' '}
              <div className="content">
                {' '}
                <table>
                  <tbody>
                    <tr>
                      <th>
                        <span className="icon">
                          <i className="fa fa-home" aria-hidden="true" />
                        </span>
                      </th>
                      <td>
                        <small>{branch}</small>
                        <span
                          className="tag is-primary"
                          style={{ margin: '0 10px' }}
                        >
                          {department}
                        </span>
                        <span className="tag is-info">{shift}</span>
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <span className="icon">
                          <i className="fa fa-barcode" aria-hidden="true" />
                        </span>
                      </th>
                      <td>
                        <small>{id}</small>
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <span className="icon">
                          <i className="fa fa-id-card-o" aria-hidden="true" />
                        </span>
                      </th>
                      <td>
                        <small>{idCardNumber}</small>
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <span className="icon">
                          <i
                            className="fa fa-envelope-o is-small"
                            aria-hidden="true"
                          />
                        </span>
                      </th>
                      <td>
                        <small>{email}</small>
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <span className="icon">
                          <i className="fa fa-phone" aria-hidden="true" />
                        </span>
                      </th>
                      <td>
                        <small>{cellPhone}</small>
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <span className="icon">
                          <i
                            className="fa fa-birthday-cake"
                            aria-hidden="true"
                          />
                        </span>
                      </th>
                      <td>
                        <small>{this.showDate(dateOfBirth)}</small>
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <span className="icon">
                          <i className="fa fa-calendar-o" aria-hidden="true" />
                        </span>
                      </th>
                      <td>
                        <small>
                          {'เข้างาน'} {this.showDate(employedDate)}
                        </small>
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <span className="icon">
                          <i className="fa fa-credit-card" aria-hidden="true" />
                        </span>
                      </th>
                      <td>
                        <small>
                          {savingsBank} {' - '} {savingsAccountID}
                        </small>
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <span className="icon">{'LV'}</span>
                      </th>
                      <td>
                        <small>
                          {leaveWithPay} {'(ลากิจพิเศษ)'}
                        </small>
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <span className="icon">{'VA'}</span>
                      </th>
                      <td>
                        <small>
                          {vacation} {'(ลาพักร้อน)'}
                        </small>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="column is-4">
          <p>Column 2</p>
        </div>
        <div className="column is-2" />
      </div>
    );
  }
}

UserInfo.propTypes = {
  data: PropTypes.object.isRequired
};

export default connect(UserInfo);
