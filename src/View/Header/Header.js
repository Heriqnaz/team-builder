import * as React from "react";
import {NavLink, Redirect, withRouter} from "react-router-dom";
import {Nav, Navbar, NavDropdown} from "react-bootstrap";
import {logout} from "../../Redux/Actions/user";
import {connect} from "react-redux";

class Header extends React.Component {

  handleLogout = () => {
    this.props.logout(this.props.history.push);
  }

  render() {
    return (
      !this.props.token && !localStorage.getItem('token') ?  <Redirect to="/login" />:
      <Navbar bg="light" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavLink
              to="/home"
              activeClassName='active'
              className="nav-link"
            >
              Home
            </NavLink>
            <NavLink
              to="/topics"
              activeClassName='active'
              className="nav-link"
            >
              Topics
            </NavLink>
            <NavLink
              to="/projects"
              activeClassName='active'
              className="nav-link"
            >
              Projects
            </NavLink>
          </Nav>
          <NavDropdown title={
            this.props.user.avatarUrl ?
            <div className="pull-left">
              <img className="thumbnail-image"
                   src={this.props.user.avatarUrl}
                   alt="user pic"
              />
            </div> : <div></div>
          }  id="basic-nav-dropdown" className="pl-5">
            <NavLink className="dropdown-item" to='/profile'>Profile</NavLink>
            <NavDropdown.Item className="dropdown-item" to='/logout' onClick={this.handleLogout}>Logout</NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Navbar>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    token: state.token
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: (historyPush) => dispatch(logout(historyPush)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
