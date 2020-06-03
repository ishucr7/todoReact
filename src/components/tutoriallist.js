import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";
import { Link } from "react-router-dom";

export default class TutorialsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveTutorials = this.retrieveTutorials.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTutorial = this.setActiveTutorial.bind(this);
    this.removeAllTutorials = this.removeAllTutorials.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      tutorials: [],
      currentTutorial: null,
      currentIndex: -1,
      searchTitle: "",
      statuses: [],
      labels: [],
      priorities: []
    };
  }

<<<<<<< Updated upstream
  componentDidMount() {
=======
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
    this.refreshList();
>>>>>>> Stashed changes
    this.retrieveTutorials();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveTutorials() {
    TutorialDataService.getAll()
      .then(response => {
        this.setState({
          tutorials: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveTutorials();
    this.setState({
      currentTutorial: null,
      currentIndex: -1
    });
  }

  setActiveTutorial(tutorial, index) {
    this.setState({
      currentTutorial: tutorial,
      currentIndex: index
    });
  }

<<<<<<< Updated upstream
=======
  deleteTutorial(id) {    
    TutorialDataService.delete(id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/tutorials');
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

>>>>>>> Stashed changes
  removeAllTutorials() {
    TutorialDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchTitle() {
    TutorialDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          tutorials: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, tutorials, currentTutorial, currentIndex,labels, statuses, priorities } = this.state;

    return (
      <div className="list row">
        <div className="col-md-10">
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
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        <div className="col-md-10">
          <h4>ToDo List</h4>

          <ul className="list-group">
            {tutorials &&
              tutorials.map((tutorial, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                   // onClick={() => this.setActiveTutorial(tutorial, index)}
                   // key={index}
                >
                <div class="task-title row">
                    <div class="col-md-2">
                        <span class="task-title-sp">{tutorial.title}   </span>
                    </div>
<<<<<<< Updated upstream
                    <div class="col-md-1.5">
                        <span class="badge bg-theme">{tutorial.duedate}    </span>
=======
                    <div class="col-md-3">
                        <span class="badge bg-theme">{tutorial.due_date}    </span>
>>>>>>> Stashed changes
                    </div>
                    <div class="col-md-1.5">
                        <span class="badge bg-theme">{tutorial.priority_id}    </span>
                    </div>
                    <div class="col-md-1.5">
                        <span class="badge bg-theme">{tutorial.label_id}    </span>
                    </div>
                    <div class="col-md-1">
                        <span class="badge bg-theme">{tutorial.status_id}    </span>
                    </div>              
                    <div class="col-md-3 pull-right row">
                        <div class="col-md-3">
                        </div>
                        <div class="col-md-1">
                            <Link to={"/tutorials/view/" + tutorial.id} className="badge badge-primary">
                              <i class="fa fa-check"></i>
                            </Link>
                        </div>
                        <div class="col-md-1">
                            <Link to={"/tutorials/" + tutorial.id} className="badge badge-warning">
                              <i class="fa fa-pencil"></i>
                            </Link>
                        </div>
<<<<<<< Updated upstream
                        <div class="col-md-2">
                            <Link to={"/tutorials/" + tutorial.id} className="badge badge-warning">
                              <i class="fa fa-trash-o "></i>
                            </Link>
=======
                        <div class="col-md-1">
                            <button
                            className="badge badge-danger mr-2"
                            onClick={() => {this.deleteTutorial(tutorial.id);/*this.refreshList();*/}}
                            >
                            <i class="fa fa-trash-o "></i>
                            </button>    
>>>>>>> Stashed changes
                        </div>
                    </div>
                </div>
                </li>
              ))}
          </ul>

          <button
            className="m-1 btn btn-sm btn-danger"
            onClick={this.removeAllTutorials}
          >
            Remove All
          </button>
          <Link to={"/add/"}
            className="float-right m-1 btn btn-sm btn-success"
            
          >
            Add
          </Link>
        </div>
        { /*<div className="col-md-6">
          {currentTutorial ? (
            <div>
              <h4>Tutorial</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentTutorial.title}
              </div>
              <div>
                <label>
                  <strong>Due Date:</strong>
                </label>{" "}
                {currentTutorial.duedate}
              </div>
              <div>
                <label>
                  <strong>Priority:</strong>
                </label>{" "}
                {currentTutorial.priority}
              </div>
              <div>
                <label>
                  <strong>Label:</strong>
                </label>{" "}
                {currentTutorial.label}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentTutorial.status}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentTutorial.description}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentTutorial.published ? "Published" : "Pending"}
              </div>

              <Link
                to={"/tutorials/" + currentTutorial.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Task...</p>
            </div>
          )}
        </div> */}
      </div>
    );
  }
}
