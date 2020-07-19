import * as React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {updateUserData} from "../../Redux/Actions/user";
import Form from "../Form/Form";

class Profile extends React.Component {

  handelSaveUserData = (data) => {
    delete data.password;
    delete data.token;
    this.props.updateUserData(data);
  }

  render() {
    return (
      !this.props.token && !localStorage.getItem('token') ?  <Redirect to="/login" /> :
        <div>
          { this.props.userIsLoading ? <div className="spinner-border text-primary m-auto"></div> :
            <div className="d-flex flex-column justify-content-center align-items-center">
              <h2 className="text-center">User Profile</h2>
              {
                Object.entries(this.props.user).length !== 0 ? <Form onSubmit={this.handelSaveUserData} userData={this.props.user}/> : ''
              }

            </div>}
        </div>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    userAreLoading: state.userAreLoading,
    token: state.token
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUserData: (data) => dispatch(updateUserData(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);