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
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveTutorials();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveTutorials() {
    this.setState({
        tutorials: [
            {
                'title': "Welcome ",
                'description': "One",
                'label': "Personal",
                'status': 'New',
                'priority': 'High'
            },
            {
                'title': "Good night",
                'description': "Two",
                'label': "Work",
                'status': 'In progress',
                'priority': 'High'
            },
            {
                'title': "Fuck off",
                'description': "Three",
                'label': "Personal",
                'status': 'New',
                'priority': 'Medium'
            },
        ]
    // tutorials: response.data
    });

    // TutorialDataService.getAll()
    //   .then(response => {
    //     this.setState({
    //       tutorials: response.data
    //     });
    //     console.log(response.data);
    //   })
    //   .catch(e => {
    //     console.log(e);
    //   });
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
    const { searchTitle, tutorials, currentTutorial, currentIndex } = this.state;

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
                //   onClick={() => this.setActiveTutorial(tutorial, index)}
                //   key={index}
                >
                <div class="task-title row">
                    <div class="col-md-2">
                        <span class="task-title-sp">{tutorial.title}   </span>
                    </div>
                    <div class="col-md-1">
                        <span class="badge bg-theme">{tutorial.status}    </span>
                    </div>
                    <div class="col-md-1">
                        <span class="badge bg-theme">{tutorial.priority}    </span>
                    </div>
                    <div class="col-md-1">
                        <span class="badge bg-theme">{tutorial.label}    </span>
                    </div>
                    <div class="col-md-6 pull-right row">
                        <div class="col-md-6">
                        </div>
                        <div class="col-md-2">
                            <button class="btn btn-success btn-xs"><i class="fa fa-check"></i></button>
                        </div>
                        <div class="col-md-2">
                            <button class="btn btn-primary btn-xs"><i class="fa fa-pencil"></i></button>
                        </div>
                        <div class="col-md-2">
                            <button class="btn btn-danger btn-xs"><i class="fa fa-trash-o "></i></button>
                        </div>
                    </div>
                </div>
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllTutorials}
          >
            Remove All
          </button>
        </div>
        {/* <div className="col-md-6">
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
              <p>Please click on a Tutorial...</p>
            </div>
          )}
        </div> */}
      </div>
    );
  }
}
