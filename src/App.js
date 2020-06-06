import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";
import PrivateComponent from './privateRoute.component'
import Login from "./components/user/login.component";
import Register from "./components/user/register.component";

const PrivateRoute = ({ component: Component, ...rest }) => {

  const isLoggedIn = AuthService.getCurrentUser();
  console.log("login me: ", isLoggedIn);
  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login'}} />
        )
      }
    />
  )
}

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showAdminBoard: false,
      currentUser: undefined
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        // showAdminBoard: user.roles.includes("ROLE_ADMIN")
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser, showAdminBoard } = this.state;

    return (
      <Router>
        <div >
          {currentUser==null ?(

            <nav className="navbar navbar-expand navbar-dark bg-dark golu">
                <a className="navbar-brand">
                  ToDoList
                </a>
                <div className="navbar-nav mr-auto">
                  <div className="navbar-nav ml-auto">
                    <li className="nav-item">
                      <Link to={"/login"} className="nav-link">
                        Login
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link to={"/register"} className="nav-link">
                        Sign Up
                      </Link>
                    </li>
                  </div>
                </div>
              </nav>
            ):("")}

          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <PrivateRoute path="/" component={PrivateComponent} />
        </div>
      </Router>
    );
  }
}

export default App;
