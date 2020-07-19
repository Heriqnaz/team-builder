import * as React from "react";
import {Link, Redirect} from "react-router-dom";

import {connect} from "react-redux";
import {register} from "../../Redux/Actions/user";
import Form from "../Form/Form";

class Register extends React.Component {

  handelSubmit = (fields) => {
    this.props.register(fields, this.props.history.push);
  }

  render() {
    return (
      this.props.token || localStorage.getItem('token') ?  <Redirect to="/home" /> :
      <div className="d-flex flex-column justify-content-center align-items-center">
        <h2 className="text-center">Register</h2>
        <Form
          onSubmit={this.handelSubmit}
        />
        <p>ALREADY HAVE AN ACCOUNT! <Link to="/login"> LOGIN </Link></p>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.token
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    register: (data, historyPush) => dispatch(register(data, historyPush))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);