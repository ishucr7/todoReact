import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/user/login.component";
import Register from "./components/user/register.component";
import Home from "./components/user/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardAdmin from "./components/board-admin.component";

import AddTask from "./components/tasks/addTask";

import Task from "./components/tasks/task";

import TasksList from "./components/tasks/tasksList";


import AddTeam from "./components/teams/addTeam";
import ViewTeam from "./components/teams/viewTeam";
import TeamsList from "./components/teams/teamsList";

import TeamTask from "./components/teams/tasks/teamTask";
import TeamTasksList from "./components/teams/tasks/teamTasksList";
import AddTeamTask from "./components/teams/tasks/addTeamTask";

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
          <nav className="navbar navbar-expand navbar-dark bg-dark golu">
            <a href="/me/tasks/list" className="navbar-brand">
              ToDoList
            </a>
            <div className="navbar-nav mr-auto">

            <li className="nav-item">
                <Link to={"/home"} className="nav-link">
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/me/tasks/list"} className="nav-link">
                  Tasks
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/me/tasks/create"} className="nav-link">
                  Add
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/teams/list"} className="nav-link">
                  Teams
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/teams/create"} className="nav-link">
                  Add Team
                </Link>
              </li>

              {showAdminBoard && (
                <li className="nav-item">
                  <Link to={"/admin"} className="nav-link">
                    Admin Board
                  </Link>
                </li>
              )}

              {currentUser && (
                <li className="nav-item">
                  <Link to={"/user"} className="nav-link">
                    User Board
                  </Link>
                </li>
              )}

            </div>

            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link">
                    {currentUser.name} Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={this.logOut}>
                    LogOut
                  </a>
                </li>
              </div>
            ) : (
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
            )}

          </nav>

          <div  className="container main">
            <Switch>
              <Route exact path={["/home"]} component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/profile" component={Profile} />
              <Route path="/user" component={BoardUser} />
              <Route path="/admin" component={BoardAdmin} />
              <Route path="/teams/create" component={AddTeam} />
              <Route path="/teams/list" component={TeamsList}/>
              <Route path="/teams/:id/tasks/create" component={AddTeamTask}/>
              <Route path="/teams/:id/tasks/:taskId/open" component={TeamTask}/>
              <Route path="/teams/:id/tasks/" component={TeamTasksList}/>
              <Route path="/teams/:id/view" component={ViewTeam}/>

              <Route exact path={["/", "/me/tasks/list"]} component={TasksList} />
              <Route exact path="/me/tasks/create" component={AddTask} />              
              <Route path="/me/tasks/:id/open" component={Task} />

            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
