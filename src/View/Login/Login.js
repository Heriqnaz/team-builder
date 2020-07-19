import * as React from "react";
import {Link, Redirect} from "react-router-dom";

import {connect} from "react-redux";
import {login} from "../../Redux/Actions/user";

class Login extends React.Component {
  state = {
    fields: {
      password: '',
      email: ''
    },
    fieldErrors: {},
  }

  onFormSubmit = (evt) => {
    evt.preventDefault();
    this.props.login(this.state.fields, this.props.history.push);
    this.setState({
      fields: {
        password: '',
        email: ''
      },
    });
  };

  onInputChange = (evt) => {
    const fields = {...this.state.fields};
    const field = evt.target.name;
    fields[evt.target.name] = evt.target.value;
    this.setState({ fields }, ()=>  {
      this.validate(field);
    });
  };

  validate = (field) => {
    const errors = {...this.state.fieldErrors};
    if (field === 'email'  && !this.validateEmail(this.state.fields[field])) {
      errors[field] = `Invalid ${field}`;
      this.setState({
        fieldErrors: errors
      })
    } else {
      errors[field] = ""
      this.setState({
        fieldErrors: errors
      })
    }
  }

  validation = () => {
    const field = {...this.state.fields};

    if (!field.password) return true;
    if (!field.email) return true;

    return false;
  };

  validateEmail = (email) => {
    const re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@(([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  render() {
    return (
      this.props.token || localStorage.getItem('token') ?  <Redirect to="/home" /> :
      <div className="d-flex flex-column justify-content-center align-items-center">
        <h2 className="text-center">Login</h2>
        <form className="form-horizontal w-25" onSubmit={this.onFormSubmit}>
          <div className="form-group">
            <label className="control-label col-sm-2" htmlFor="email">Email:</label>
            <div className="col-sm-12">
              <input type="text"
                     className="form-control"
                     id="email"
                     placeholder="Enter email"
                     name="email"
                     value={this.state.fields.email}
                     onChange={this.onInputChange}
              />
              <p className="text-danger">{ this.state.fieldErrors.email}</p>
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-2" htmlFor="password">Password:</label>
            <div className="col-sm-12">
              <input type="password" className="form-control" id="password" placeholder="Enter password" name="password" value={this.state.fields.password} onChange={this.onInputChange}/>
              <p className="text-danger">{ this.state.fieldErrors.password}</p>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button type="submit" className="text-center btn btn-info" disabled={this.validation()}>Login</button>
            </div>
          </div>
        </form>
        <p className="text-center">DON'T HAVE AN ACCOUNT? <Link to="/register"> REGISTER NOW </Link></p>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    hasError: state.loginHaveError,
    isLoading: state.loginAreLoading,
    user: state.user,
    token: state.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (data, historyPush) => dispatch(login(data, historyPush))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);