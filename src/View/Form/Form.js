import * as React from "react";

import {connect} from "react-redux";
import {getCompaniesData, register} from "../../Redux/Actions/user";
import ReactFormInputValidation from "react-form-input-validation";

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fields: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        birthDate: '',
        sex: 'male',
        avatarUrl: '',
        jsExperience: 0,
        reactExperience: 0,
        companyId: 1,
      },
      fieldErrors: {},
      errors: {},
    }

    this.form = new ReactFormInputValidation(this);
    this.form.useRules({
      firstName: "required",
      lastName: "required",
      email: "required|email",
      password: "required",
      birthDate: "required",
      sex: "required",
      avatarUrl: "required|url",
      jsExperience: "required|numeric|min:0",
      reactExperience: "required|numeric",
      companyId: "required",
    });
  }

  componentDidMount() {
    this.props.getCompanies();
    this.setUserData();
  }

  setUserData = () => {
    if (this.props.userData &&  this.props.userData.firstName) {
      const userData = {...this.props.userData};
      this.setState({
        fields: userData
      });
    }
  }

  onFormSubmit = (evt) => {
    evt.preventDefault();
    const fields = {...this.state.fields};
    if (Object.entries(this.state.errors).length !== 0) {
      if ((this.props.userData && Object.entries(this.props.userData).length !== 0 && !this.state.errors.password) || (!this.props.userData || Object.entries(this.props.userData).length === 0)) {
        return;
      }
    }
    console.log('777777777777777', fields);
    console.log('errors', this.state.errors);

    this.setState({
      fields
    })
    this.props.onSubmit(this.state.fields);
    !this.props.userData || Object.entries(this.props.userData).length === 0 ?
    this.setState({
      fields: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        birthDate: '',
        sex: 'male',
        avatarUrl: '',
        jsExperience: 0,
        reactExperience: 0,
        companyId: 1,
      },
    }) : this.setUserData();
  };

  validation = () => {
    const field = this.state.fields;
    const fieldErrors = this.state.errors;
    const errMessages = Object.keys(fieldErrors).filter((k) => fieldErrors[k]);

    if (!field.firstName) return true;
    if (!field.lastName) return true;
    if (!field.avatarUrl) return true;
    if (!field.sex) return true;
    if (!field.companyId) return true;
    if (!field.email) return true;
    if (!field.birthDate) return true;
    if (!field.password && ( !this.props.userData || Object.entries(this.props.userData).length === 0)) return true;
    if (!field.jsExperience && field.jsExperience !== 0) return true;
    if (!field.reactExperience && field.reactExperience !== 0) return true;
    if (errMessages.length) return true;

    return false;
  };

  render() {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center">
        {this.props.registerIsLoading ?
          <div className="loader">
            <div className="spinner-border text-primary"></div>
          </div> : <div></div>
        }
        <form className="form-horizontal" onSubmit={this.onFormSubmit}>
          <div className="form-group row">
            <div className="col-6">
              <label className="control-label" htmlFor="firstName">First Name:</label>
              <input
                type="text"
                name="firstName"
                className="form-control"
                onBlur={this.form.handleBlurEvent}
                onChange={this.form.handleChangeEvent}
                value={this.state.fields.firstName}
              />
              <p className="text-danger">{ this.state.errors.firstName}</p>
            </div>
            <div className="col-6">
              <label className="control-label" htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                name="lastName"
                className="form-control"
                onBlur={this.form.handleBlurEvent}
                onChange={this.form.handleChangeEvent}
                value={this.state.fields.lastName}
              />
              <p className="text-danger">{ this.state.errors.lastName}</p>
            </div>
          </div>
          <div className="form-group row">
            <div className="col-6">
              <label className="control-label" htmlFor="avatarUrl">Avatar URL:</label>
              <input
                type="text"
                name="avatarUrl"
                className="form-control"
                onBlur={this.form.handleBlurEvent}
                onChange={this.form.handleChangeEvent}
                value={this.state.fields.avatarUrl}
              />
              <p className="text-danger">{ this.state.errors.avatarUrl}</p>
            </div>
            <div className="col-6">
              <label htmlFor="sel1">Sex:</label>
              <select
                className="form-control"
                id="sex"
                name="sex"
                value={this.state.fields.sex}
                onChange={this.form.handleChangeEvent}
                onBlur={this.form.handleBlurEvent}
              >
                <option value='male'>Male</option>
                <option value='female'>Female</option>
              </select>
            </div>
          </div>
          <div className="form-group row">
            <div className="col-6">
              <label className="control-label" htmlFor="avatarUrl">Birth Date:</label>
              <br/>
              <input
                className="form-control col-12"
                type="date"
                name="birthDate"
                onChange={this.form.handleChangeEvent}
                onBlur={this.form.handleBlurEvent}
                value={this.state.fields.birthDate}
              />
              <p className="text-danger">{ this.state.errors.birthDate}</p>
            </div>
            <div className="col-6">
              <label htmlFor="sel1">Company:</label>
              <select
                className="form-control"
                id="companyId"
                name="companyId"
                value={this.state.fields.companyId}
                onChange={this.form.handleChangeEvent}
                onBlur={this.form.handleBlurEvent}
              >
                { this.props.companiesIsLoading ?
                  <option>Loading…</option> :
                  this.props.companies.map((company) => (
                    <option value={company.id} key={company.id}>{company.name}</option>
                  ))}
              </select>
            </div>
          </div>
          <div className="form-group row">
            <div className="col-6">
              <label className="control-label" htmlFor="password">Js Experience:</label>
              <input
                min="0"
                type="number"
                name="jsExperience"
                className="form-control"
                onBlur={this.form.handleBlurEvent}
                onChange={this.form.handleChangeEvent}
                value={this.state.fields.jsExperience}
              />
              <p className="text-danger">{ this.state.errors.jsExperience}</p>
            </div>
            <div className="col-6">
              <label className="control-label" htmlFor="password">React Experience:</label>
              <input
                min="0"
                type="number"
                name="reactExperience"
                className="form-control"
                onBlur={this.form.handleBlurEvent}
                onChange={this.form.handleChangeEvent}
                value={this.state.fields.reactExperience}
              />
              <p className="text-danger">{ this.state.errors.reactExperience}</p>
            </div>
          </div>
          <div className="form-group row">
            <div className={!this.props.userData || Object.entries(this.props.userData).length === 0 ? 'col-6' : 'col-12'}>
              <label className="control-label" htmlFor="email">Email:</label>
              <input
                className="form-control"
                type="email"
                name="email"
                onBlur={this.form.handleBlurEvent}
                onChange={this.form.handleChangeEvent}
                value={this.state.fields.email}
              />
              <p className="text-danger">{ this.state.errors.email}</p>
            </div>
            <div className={!this.props.userData ||  Object.entries(this.props.userData).length === 0 ? 'col-sm-6' : 'd-none'}>
              <label className="control-label" htmlFor="password">Password:</label>
              <input
                className="form-control"
                type="password"
                name="password"
                onBlur={this.form.handleBlurEvent}
                onChange={this.form.handleChangeEvent}
                value={this.state.fields.password}
              />
              <p className="text-danger">{ this.state.errors.password}</p>
            </div>
          </div>
          <div className="form-group">
            <div className="col-12 text-center">
              <button type="submit" className="btn btn-info w-50" disabled={this.validation()}>{this.props.userData ? 'Save' : 'Register'}</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    companies: state.companies,
    companiesHaveError: state.companiesHasError,
    companiesIsLoading: state.companiesAreLoading,
    registerHaveError: state.registerHasError,
    registerIsLoading: state.registerAreLoading,
    token: state.token
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCompanies: () => dispatch(getCompaniesData()),
    register: (data) => dispatch(register(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);