import React, { Component } from "react";
import TeamDataService from "../services/tutorial.service";
import { Link } from "react-router-dom";
import SeederDataService from "../services/seeder.service";
import moment from 'moment';

export default class TeamTasksList extends Component {
  constructor(props) {
    super(props);

    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);

    this.retrieveTasks = this.retrieveTasks.bind(this);
    this.loadSeeder = this.loadSeeder.bind(this);
    this.removeAllTasks = this.removeAllTasks.bind(this);
    this.searchTitle = this.searchTitle.bind(this);
    this.deleteTeam = this.deleteTeam.bind(this);
    this.handlePriorityColor = this.handlePriorityColor.bind(this);
    this.handleStatusColor = this.handleStatusColor.bind(this);
    this.handleLabelColor = this.handleLabelColor.bind(this);
    

    this.state = {
      tasks: [],
      searchTitle: "",
      statuses: [],
      labels: [],
      priorities: [],
      team_id: this.props.match.params.id,
    };
  }

loadSeeder(){
    console.log("Inside load Seeder");
    SeederDataService.getAllLabels().then(response => {
      console.log("Labels", response);
      this.setState({
        labels:response.data,
        //label: response.data[0]['id'],
      });
    })

    SeederDataService.getAllStatuses().then(response => {
      console.log("Statuses ", response);
      this.setState({
        statuses:response.data,
        //status: response.data[0]['id'],
      });
    })

    SeederDataService.getAllPriorities().then(response => {
      console.log("Priorities" ,response);
      this.setState({
        priorities:response.data,
        //priority: response.data[0]['id'],
      });
    })

  }

  componentDidMount() {
    this.loadSeeder();
    this.retrieveTasks(this.props.match.params.id);
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveTasks(id) {
    console.log("inside retrwice");
    setTimeout(() => {
    TeamDataService.getTasksByTeamId(id)
      .then(response => {
        this.setState({
          tasks: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
    }, 1000);
  }


  deleteTeam(id) {
    TeamDataService.delete(id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/tasks');
        this.retrieveTasks(this.props.match.params.id);
      })
      .catch(e => {
        console.log(e);
      });
  }

  removeAllTasks() {
    TeamDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.retrieveTasks(this.props.match.params.id);

      })
      .catch(e => {
        console.log(e);
      });
  }

  searchTitle() {
    TeamDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          tasks: response.data
        });
        console.log("SEARCH TITLE THING ", response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  handlePriorityColor(priority_name){
    switch(priority_name){
      case "High":{
        return "badge Red"
      }
      case "Medium":{
        return "badge Lime"
      }
      case "Low":{
        return "badge Yellow"
      }
    }
  }
  handleStatusColor(status_name){
    switch(status_name){
      case "Completed":{
        return "badge Silver"
      }
      case "In Progress":{
        return "badge Gold"
      }
      case "New":{
        return "badge RoyalBlue"
      }
    }
  }

  handleLabelColor(label_name){
    switch(label_name){
      case "Work":{
        return "badge Purple"
      }
      case "Personal":{
        return "badge Pink"
      }
      case "Shopping":{
        return "badge Orange"
      }
      case "Others":{
        return "badge lightBlue"
      }
    }
  }


  render() {
    const { searchTitle, tasks, team_id, currentTeam,labels, statuses, priorities } = this.state;

    return (
      <div className="list row">
        <div className="col-md-11">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary color-azure"
                type="button"
                onClick={this.searchTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        <div className="col-md-11">
          <h4>Team ToDo List</h4>

          <ul className="list-group">
            {tasks &&
              tasks.map((tutorial, index) => (
                <li className="list-group-item ">
                <div class="task-title row">
                    <div class="col-md-2">
                        <span class="task-title-sp Highlight">{tutorial.title}   </span>
                    </div>
                    <div class="col-md-2">
                      {(tutorial.due_date) ?
                        <span class="badge Clay">{moment(tutorial.due_date).format("DD-MM-YYYY")}    </span>
                        : <span></span>
                      }
                    </div>
                    <div class="col-md-1">
                        <span class={this.handlePriorityColor(tutorial.priority)}>{tutorial.priority}    </span>
                    </div>
                    <div class="col-md-1">
                        <span class={this.handleLabelColor(tutorial.label)}>{tutorial.label}    </span>
                    </div>
                    <div class="col-md-2">
                        <span class={this.handleStatusColor(tutorial.status)}>{tutorial.status}    </span>
                    </div>              
                    <div class="col-md-4">
                    </div>              
                    <div class="col-md-1 pull-right row">
                        <div class="col-md-2">
                            <Link to={"/teams/"+team_id + "/tasks/" + tutorial.id + "/view/" } className="badge badge-primary">
                                Open
                            </Link>
                        </div>
                        <div class="col-md-1"></div>
                        <div class="col-md-2">
                          <button className = "badge badge-danger Hovering buttonAsALink" onClick={() => {
                            this.deleteTeam(
                            tutorial.id);
                          }                          
                          }
                          >
                              Delete
                          </button>
                        </div>
                    </div>
                </div>
                </li>
              ))}
          </ul>

          <button
            className="m-1 btn btn-sm btn-danger"
            onClick={this.removeAllTasks}
          >
            Remove All
          </button>
          <Link to={"/teams/" + team_id + "/tasks/create"}
            className="float-right m-1 btn btn-sm btn-success"
            
          >
            Add
          </Link>
        </div>
      </div>
    );
  }
}