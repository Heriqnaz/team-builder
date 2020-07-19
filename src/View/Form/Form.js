import * as React from "react";
import DatePicker from "react-datepicker";
import * as moment from 'moment'

import "react-datepicker/dist/react-datepicker.css";
import {connect} from "react-redux";
import {getCompaniesData, register} from "../../Redux/Actions/user";

class Form extends React.Component {
  state = {
    fields: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      birthDate: new Date(),
      sex: 'male',
      avatarUrl: '',
      jsExperience: 0,
      reactExperience: 0,
      companyId: 1,
    },
    fieldErrors: {},
  }

  componentDidMount() {
    this.props.getCompanies();
    this.setUserData();
  }

  setUserData = () => {
    if (this.props.userData &&  this.props.userData.firstName) {
      const userData = {...this.props.userData};
      userData.birthDate = new Date(userData.birthDate);
      this.setState({
        fields: userData
      });
    }
  }

  onFormSubmit = (evt) => {
    const fields = this.state.fields;
    evt.preventDefault();
    fields['birthDate'] = moment(fields.birthDate).format('YYYY-MM-DD');
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

  onInputChange = (evt) => {
    const fields = this.state.fields;
    const field = evt.target.name;
    fields[evt.target.name] = evt.target.value;
    this.setState({ fields }, ()=>  {
      this.validate(field);
    });
  };

  validate = (field) => {
    const errors = {...this.state.fieldErrors};
    if (!this.state.fields[field] && ((field === 'jsExperience' || field === 'reactExperience') && this.state.fields[field] !== 0) && (field === 'password' && (!this.props.userData || Object.entries(this.props.userData).length === 0))) {
      errors[field] = `${field} required`
      this.setState({
        fieldErrors: errors
      })
    } else if (field === 'email'  && !this.validateEmail(this.state.fields[field])) {
      errors[field] = `Invalid ${field}`;
      this.setState({
        fieldErrors: errors
      })
    } else if (field === 'avatarUrl' && !this.validateUrl(this.state.fields[field]))  {
      errors[field] = `Invalid Avatar Url`;
      this.setState({
        fieldErrors: errors
      })
    } else if ((field === 'jsExperience' || field === 'reactExperience') && this.state.fields[field] < 0) {
      errors[field] = `Not use negative value`;
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
    const field = this.state.fields;
    const fieldErrors = this.state.fieldErrors;
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

  handleChange = date => {
    const fields = {...this.state.fields};
    fields['birthDate'] = date
    this.setState({
      fields
    });
  };

  validateEmail = (email) => {
    const re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@(([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  validateUrl = (url) => {
    const urlPattern = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;
    return urlPattern.test(String(url).toLowerCase());
  }

  render() {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center">
        {this.props.registerIsLoading ?
          <div className="loader">
            {this.props.isLoad ? <div className="spinner-border text-primary"></div> : 'No data'}
          </div> : <div></div>
        }
        <form className="form-horizontal" onSubmit={this.onFormSubmit}>
          <div className="form-group row">
            <div className="col-6">
              <label className="control-label" htmlFor="firstName">First Name:</label>
              <input type="text" className="form-control" id="firstName" placeholder="Enter First name" name="firstName" value={this.state.fields.firstName} onChange={this.onInputChange}/>
              <p className="text-danger">{ this.state.fieldErrors.firstName}</p>
            </div>
            <div className="col-6">
              <label className="control-label" htmlFor="lastName">Last Name:</label>
              <input type="text" className="form-control" id="lastName" placeholder="Enter  Last name" name="lastName" value={this.state.fields.lastName} onChange={this.onInputChange}/>
              <p className="text-danger">{ this.state.fieldErrors.lastName}</p>
            </div>
          </div>
          <div className="form-group row">
            <div className="col-6">
              <label className="control-label" htmlFor="avatarUrl">Avatar URL:</label>
              <input type="text" className="form-control" id="avatarUrl" placeholder="Enter name" name="avatarUrl" value={this.state.fields.avatarUrl} onChange={this.onInputChange}/>
              <p className="text-danger">{ this.state.fieldErrors.avatarUrl}</p>
            </div>
            <div className="col-6">
              <label htmlFor="sel1">Sex:</label>
              <select className="form-control" id="sel1" value={this.state.fields.sex} onChange={this.onInputChange} name="sex">
                <option value='male'>Male</option>
                <option value='female'>Female</option>
              </select>
            </div>
          </div>
          <div className="form-group row">
            <div className="col-6">
              <label className="control-label" htmlFor="avatarUrl">Birth Date:</label>
              <br/>
              <DatePicker
                selected={this.state.fields.birthDate}
                onChange={this.handleChange}
                name="birthDate"
                className="form-control col-12"
              />
              <p className="text-danger">{ this.state.fieldErrors.birthDate}</p>
            </div>
            <div className="col-6">
              <label htmlFor="sel1">Company:</label>
              <select className="form-control" id="sel1" value={this.state.fields.companyId} onChange={this.onInputChange} name="companyId">
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
              <input type="number" className="form-control" min="0" id="jsExperience" placeholder="Enter Js Experience" name="jsExperience" value={this.state.fields.jsExperience} onChange={this.onInputChange}/>
              <p className="text-danger">{ this.state.fieldErrors.jsExperience}</p>
            </div>
            <div className="col-6">
              <label className="control-label" htmlFor="password">React Experience:</label>
              <input type="number" min="0" className="form-control" id="reactExperience" placeholder="Enter React Experience" name="reactExperience" value={this.state.fields.reactExperience} onChange={this.onInputChange}/>
              <p className="text-danger">{ this.state.fieldErrors.reactExperience}</p>
            </div>
          </div>
          <div className="form-group row">
            <div className={!this.props.userData || Object.entries(this.props.userData).length === 0 ? 'col-6' : 'col-12'}>
              <label className="control-label" htmlFor="email">Email:</label>
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
            <div className={!this.props.userData ||  Object.entries(this.props.userData).length === 0 ? 'col-sm-6' : 'd-none'}>
              <label className="control-label" htmlFor="password">Password:</label>
              <input type="password" className="form-control" id="password" placeholder="Enter password" name="password" value={this.state.fields.password} onChange={this.onInputChange}/>
              <p className="text-danger">{ this.state.fieldErrors.password}</p>
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