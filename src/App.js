import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Style/style.css';
import {Redirect, Route, BrowserRouter as Router, Switch} from "react-router-dom";
import Login from "./View/Login/Login";
import Home from "./View/Home/Home";
import Header from "./View/Header/Header";
import Register from "./View/Register/Register";
import Topics from "./View/Topics/Topics";
import Projects from "./View/Projects/Projects";
import Profile from "./View/Profile/Profile";
import {getUser} from "./Redux/Actions/user";
import {connect} from "react-redux";

class App extends React.Component {

  constructor(props) {
    super(props);
    localStorage.getItem('token') && props.getUserInfo();
  }

  render() {
    return (
      <Router>
        <Header></Header>
        <div className="container">
          <Switch>
            <Route  path='/login' component={Login} />
            <Route  path='/register' component={Register} />
            <Route exect path='/home' component={Home} />
            <Route exect  path='/topics' component={Topics} />
            <Route exect  path='/projects' component={Projects} />
            <Route exect  path='/profile' component={Profile} />
            <Route exect  path='/' render={() => {
              return (
                <Redirect
                  to='/home'
                />
              );
            }} />
          </Switch>
        </div>
      </Router>
    );
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
    getUserInfo: () => dispatch(getUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
