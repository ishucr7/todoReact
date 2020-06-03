import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";
import SeederDataService from "../services/seeder.service";
import moment from 'moment';

export default class Tutorial extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDuedate = this.onChangeDuedate.bind(this);
    this.onChangePriority = this.onChangePriority.bind(this);
    this.onChangeLabel = this.onChangeLabel.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);

    this.getTutorial = this.getTutorial.bind(this);
    this.loadSeeder = this.loadSeeder.bind(this);
    
    this.updatePublished = this.updatePublished.bind(this);
    this.updateTutorial = this.updateTutorial.bind(this);
    this.deleteTutorial = this.deleteTutorial.bind(this);

    this.state = {
      currentTutorial: {
        id: null,
        title: "",
        duedate: "",
        priority: "",
        label: "",
        status: "", 
        description: "",
        published: false
      },
      message: "",
      statuses: [],
      labels: [],
      priorities: []
    };
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentTutorial: {
          ...prevState.currentTutorial,
          title: title
        }
      };
    });
  }

  onChangeDuedate(e) {
    const duedate = e.target.value;

    this.setState(function(prevState) {
      return {
        currentTutorial: {
          ...prevState.currentTutorial,
          duedate: duedate
        }
      };
    });
  }

  onChangePriority(e) {
    const priority = e.target.value;
    console.log("ppppppppppp ",priority);
    this.setState(function(prevState) {
      return {
        currentTutorial: {
          ...prevState.currentTutorial,
          priority: priority
        }
      };
    });
  }

  onChangeLabel(e) {
    const label = e.target.value;

    this.setState(function(prevState) {
      return {
        currentTutorial: {
          ...prevState.currentTutorial,
          label: label
        }
      };
    });
  }

  onChangeStatus(e) {
    const status = e.target.value;

    this.setState(function(prevState) {
      return {
        currentTutorial: {
          ...prevState.currentTutorial,
          status: status
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;

    this.setState(prevState => ({
      currentTutorial: {
        ...prevState.currentTutorial,
        description: description
      }
    }));
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
        //currentTutorial.priority: response.data[0]['id'],
      });
    })
  }

  componentDidMount() {
    this.loadSeeder();
    this.getTutorial(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentTutorial: {
          ...prevState.currentTutorial,
          title: title
        }
      };
    });
  }

  onChangeDuedate(e) {
    const duedate = e.target.value;

    this.setState(function(prevState) {
      return {
        currentTutorial: {
          ...prevState.currentTutorial,
          duedate: duedate
        }
      };
    });
  }

  onChangePriority(e) {
    const priority = e.target.value;

    this.setState(function(prevState) {
      return {
        currentTutorial: {
          ...prevState.currentTutorial,
          priority: priority
        }
      };
    });
  }

  onChangeLabel(e) {
    const label = e.target.value;

    this.setState(function(prevState) {
      return {
        currentTutorial: {
          ...prevState.currentTutorial,
          label: label
        }
      };
    });
  }

  onChangeStatus(e) {
    const status = e.target.value;

    this.setState(function(prevState) {
      return {
        currentTutorial: {
          ...prevState.currentTutorial,
          status: status
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentTutorial: {
        ...prevState.currentTutorial,
        description: description
      }
    }));
  }

  getTutorial(id) {
    console.log("****",id);
    TutorialDataService.get(id)
      .then(response => {
        this.setState({
          currentTutorial: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentTutorial.id,
      title: this.state.currentTutorial.title,
      due_date: this.state.currentTutorial.duedate,
      priority_id: this.state.currentTutorial.priority,
      label_id: this.state.currentTutorial.label,
      status_id: this.state.currentTutorial.status, 
      description: this.state.currentTutorial.description,
      published: status
    };

    TutorialDataService.update(this.state.currentTutorial.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentTutorial: {
            ...prevState.currentTutorial,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateTutorial() {
    TutorialDataService.update(
      this.state.currentTutorial.id,
      this.state.currentTutorial
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "Changes saved successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteTutorial() { 
    console .log("delete id",this.state.currentTutorial.title);   
    TutorialDataService.delete(this.state.currentTutorial.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/tutorials');
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
     const { currentTutorial,labels, statuses, priorities } = this.state;

    return (
      <div>
        {currentTutorial ? (
          <div className="edit-form">
            <h4>Tutorial</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentTutorial.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="duedate">Due Date</label>
                <input
                  type="date"
                  className="form-control"
                  id="duedate"
                  value={currentTutorial.duedate ? moment(currentTutorial.duedate).format("YYYY-MM-DD") : null}
                  onChange={this.onChangeDuedate}
                />
              </div>
              <div className="form-group">
                <label htmlFor="priority">Priority</label>
                <select
                className="form-control"
                id="priority"
                required
                value={currentTutorial.priority}
                onChange={this.onChangePriority}
                name="priority">
                {priorities.map(priority =>(
                  <option key={priority.id} value={priority.id}>{priority.name}</option>
                ))}
              </select>
              </div>
              <div className="form-group">
                <label htmlFor="label">Label</label>
                <select
                className="form-control"
                id="label"
                required
                value={currentTutorial.label}
                onChange={this.onChangeLabel}
                name="label">
                {labels.map(label =>(
                  <option key={label.id} value={label.id}>{label.name}</option>
                ))}
              </select>
              </div>
              <div className="form-group">
                <label htmlFor="status">Status</label>
                <select
                className="form-control"
                id="status"
                required
                value={currentTutorial.status}
                onChange={this.onChangeStatus}
                name="status">
                {priorities.map(status =>(
                  <option key={status.id} value={status.id}>{status.name}</option>
                ))}
              </select>
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentTutorial.description}
                  onChange={this.onChangeDescription}
                />
              </div>
            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteTutorial}
            >
              Delete Task
            </button>

            <button
              type="submit"
              className="float-right badge badge-success"
              onClick={this.updateTutorial}
            >
              Save Changes
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Task...</p>
          </div>
        )}
      </div>
    );
  }
}
