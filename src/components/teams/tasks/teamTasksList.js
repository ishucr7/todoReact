import React, { Component } from "react";
import TaskDataService from "../../../services/tasks.service";
import { Link } from "react-router-dom";
import SeederDataService from "../../../services/seeder.service";
import FilterService from "../../../services/filter.service";
import moment from 'moment';

export default class TeamTasksList extends Component {
  constructor(props) {
    super(props);

    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.onChangeSort = this.onChangeSort.bind(this);
    this.onChangePriorityFilter = this.onChangePriorityFilter.bind(this);
    this.onChangeStatusFilter = this.onChangeStatusFilter.bind(this);
    this.onChangeLabelFilter = this.onChangeLabelFilter.bind(this);
    this.filter_status = this.filter_status.bind(this);
    this.retrieveTasks = this.retrieveTasks.bind(this);
    this.loadSeeder = this.loadSeeder.bind(this);
    this.removeAllTasks = this.removeAllTasks.bind(this);
    this.searchTitle = this.searchTitle.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.handlePriorityColor = this.handlePriorityColor.bind(this);
    this.handleStatusColor = this.handleStatusColor.bind(this);
    this.handleLabelColor = this.handleLabelColor.bind(this);
    

    this.state = {
      alltasks: [],
      tasks: [],
      searchTitle: "",
      statuses: [],
      labels: [],
      priorities: [],
      team_id: this.props.match.params.id,
      filter: {
        priority: "all",
        status: "all",
        label:"all"
      },
      sort: "",
    };
  }

  filter_status(){
      TaskDataService.getTasksByTeamId(this.state.team_id)
        .then(response => {
          var filtered_tasks = FilterService.getTasks({
            'allTasks': response.data,
            'filter_status': this.state.filter.status,
            'filter_priority': this.state.filter.priority,
            'filter_label': this.state.filter.label,
          });
          this.setState({
            tasks: filtered_tasks,
            alltasks: response.data
          });
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
  }

   onChangePriorityFilter(e) {
    const priority = e.target.value;
    console.log("filter by priority",priority);
    this.setState(function(prevState) {
      return {
        filter: {
          ...prevState.filter,
          priority: priority,
        }
      };
    },()=>{console.log("filter by priority",priority,this.state.filter.priority);
      this.filter_status();
    });
  }
  onChangeStatusFilter(e) {
    const status = e.target.value;
    console.log("filter by status",status,this.state.filter.status);
    this.setState(function(prevState) {
      return {
        filter: {
          ...prevState.filter,
          status: status,
        }
      };
    },()=>{console.log("filter by status",status,this.state.filter.status);
      this.filter_status();
    });
  }
  onChangeLabelFilter(e) {
    const label = e.target.value;
    console.log("filter by label",label);
    this.setState(function(prevState) {
      return {
        filter: {
          ...prevState.filter,
          label: label,
        }
      };
    },()=>{console.log("filter by label",label,this.state.filter.label);
      this.filter_status();
    });
  }

  onChangeSort(){

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
    TaskDataService.getTasksByTeamId(id)
      .then(response => {
        this.setState({
          tasks: response.data,
          alltasks: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
    }, 1000);
  }


  deleteTask(id) {
    const team_id = this.state.team_id; 
    TaskDataService.delete(id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/teams/' + team_id + '/tasks/list');
        this.retrieveTasks(this.props.match.params.id);
      })
      .catch(e => {
        console.log(e);
      });
  }

  removeAllTasks() {
    TaskDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.retrieveTasks(this.props.match.params.id);

      })
      .catch(e => {
        console.log(e);
      });
  }

  searchTitle() {
    TaskDataService.findByTitle(this.state.searchTitle)
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
    const { searchTitle,alltasks, tasks, team_id, currentTeam,labels, statuses, priorities , filter,sort} = this.state;

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
        <div className="col-md-13 ">
          <div className="input-group mb-3">
            <div className="mr-auto">
            <h4>Team ToDo List</h4>
            </div>
            <div className="input-group-append ml-auto ">
             <Link to={"/teams/" + team_id + "/tasks/create"}
            className="float-right m-1 btn btn-sm btn-success"
            
          >
            Add
          </Link>
            </div>
          </div>
        </div>

         <div className="col-md-13 ">
          <div className="input-group mb-3">
            <div className="">
             <h5 style={{color:"white"}}> Sort By</h5>
             </div>
             <div>
            <span class="col-md-1">
            </span>
            </div> 
            <div className="mr-auto">
             <select
                className="form-control"
                id="sort"
                required
                value={sort}
                onChange={this.onChangeSort}
                name="sort">
                <option selected disabled key="" value="">Priority/Date</option>
                <option selected disabled key="" value="">Priority</option>
                <option key="Highest" value="Highest">Highest</option>
                <option key="Lowest" value="Lowest">Lowest</option>
                <option selected disabled key="" value="">Due Date</option>
                <option key="Earliest" value="Earliest">Earliest</option>
              </select>
            </div>            
            <div className="ml-auto">
             <h5 style={{color:"white"}}> Filter By</h5>
             </div>
             <div>
            <span class="col-md-1">
            </span>
            </div> 
            <div className="">
             <select
                className="form-control"
                id="priority"
                required
                value={filter.priority}
                onChange={this.onChangePriorityFilter}
                name="priority">
                <option selected disabled key="all" value="all">Priority</option>
                <option key="all" value="all">All</option>
                {priorities.map(priority =>(
                  <option key={priority.name} value={priority.name}>{priority.name}</option>
                ))}
              </select>
            </div>
            <div>
            <span class="col-md-1">
            </span>
            </div>             
            <div className="">
              <select
                className="form-control"
                id="label"
                required
                value={filter.label}
                onChange={this.onChangeLabelFilter}
                name="label">
                <option selected disabled key="all" value="all">Label</option>
                <option key="all" value="all">All</option>
                {labels.map(label =>(
                  <option key={label.name} value={label.name}>{label.name}</option>
                ))}
              </select>
            </div>
            <div>
            <span class="col-md-1">
            </span>
            </div> 
            <div className="">
             <select
                className="form-control"
                id="status"
                required
                value={filter.status}
                onChange={this.onChangeStatusFilter}
                name="status">
                <option selected disabled key="all" value="all">Status</option>
                <option key="all" value="all">All</option>
                {statuses.map(status =>(
                  <option key={status.name} value={status.name}>{status.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
          

          <ul className="list-group">
             <li className="list-group-item" style={{backgroundColor:"azure"}}>
                <div className="task-title row">
                    <div className="col-md-2 ListHeading">
                        <span className="">Title</span>
                    </div>
                    <div class="col-md-2">
                        <span className="ListHeading">Due Date</span>
                    </div>
                    <div class="col-md-1">
                        <span className="ListHeading"> Priority </span>
                    </div>
                    <div class="col-md-1">
                        <span className="ListHeading"> Label </span>
                    </div>
                    <div class="col-md-2">
                        <span className="ListHeading">Status </span>
                    </div>  
                    <div class="col-md-1">
                    </div>
                    <div class="col-md-3.5 pull-right row">                        
                        <div class="col-md-3">
                            <span className="ListHeading">
                              Open
                            </span>
                        </div>
                        <div class="col-md-3">
                        </div>
                        <div class="col-md-5" >
                          <span className="ListHeading" style={{align:"right"}}>
                            Delete
                          </span>
                        </div>
                    </div>
                </div>
            </li>
            {tasks &&
              tasks.map((task, index) => (
                <li className="list-group-item ">
                <div class="task-title row">
                    <div class="col-md-2">
                        <span class="task-title-sp Highlight">{task.title}   </span>
                    </div>
                    <div class="col-md-2">
                      {(task.due_date) ?
                        <span class="badge Clay">{moment(task.due_date).format("DD-MM-YYYY")}    </span>
                        : <span></span>
                      }
                    </div>
                    <div class="col-md-1">
                        <span class={this.handlePriorityColor(task.priority)}>{task.priority}    </span>
                    </div>
                    <div class="col-md-1">
                        <span class={this.handleLabelColor(task.label)}>{task.label}    </span>
                    </div>
                    <div class="col-md-2">
                        <span class={this.handleStatusColor(task.status)}>{task.status}    </span>
                    </div>              
                    <div class="col-md-1">
                    </div>              
                    <div class="col-md-3.5 pull-right row">
                        <div class="col-md-3">
                            <Link to={"/teams/"+team_id + "/tasks/" + task.id + "/open/" } className="badge badge-primary">
                                Open
                            </Link>
                        </div>
                        <div class="col-md-2"></div>
                        <div class="col-md-5">
                          <button className = "badge badge-danger Hovering buttonAsALink" onClick={() => {
                            this.deleteTask(
                            task.id);
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

         
        </div>
      </div>
    );
  }
}
