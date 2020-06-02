import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";
import SeederDataService from "../services/seeder.service";

export default class AddTutorial extends Component {
  constructor(props) {

    super(props);

    this.loadSeeder = this.loadSeeder.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);

    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuedate = this.onChangeDuedate.bind(this);

    this.onChangeLabel = this.onChangeLabel.bind(this);
    this.onChangePriority = this.onChangePriority.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);

    this.saveTutorial = this.saveTutorial.bind(this);
    this.newTutorial = this.newTutorial.bind(this);

    this.state = {
      id: null,
      title: "",
      duedate: "",
      priority: "",
      label: "",
      status: "", 
      description: "",
      submitted: false,
      statuses: [],
      labels: [],
      priorities: [],

    };
  }


  loadSeeder(){
    console.log("Inside load Seeder");
    SeederDataService.getAllLabels().then(response => {
      console.log("Labels", response);
      this.setState({
        labels:response.data,
        label: response.data[0]['id'],
      });
    })

    SeederDataService.getAllStatuses().then(response => {
      console.log("Statuses ", response);
      this.setState({
        statuses:response.data,
        status: response.data[0]['id'],
      });
    })

    SeederDataService.getAllPriorities().then(response => {
      console.log("Priorities" ,response);
      this.setState({
        priorities:response.data,
        priority: response.data[0]['id'],
      });
    })

  }
  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangeDuedate(e) {
    this.setState({
      duedate: e.target.value
    });
  }

  onChangePriority(e) {
    this.setState({
      priority: e.target.value
    });
  }

  onChangeLabel(e) {
    this.setState({
      label: e.target.value
    });
  }

  onChangeStatus(e) {
    this.setState({
      status: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  saveTutorial() {
    var data = {
      title: this.state.title,
      due_date: this.state.duedate,
      priority_id: this.state.priority,
      status_id: this.state.status,
      label_id: this.state.label,
      description: this.state.description
    };
    
    TutorialDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          duedate: response.data.duedate,
          priority: response.data.priority_id,
          label: response.data.label_id,
          status: response.data.status_id, 
          description: response.data.description,
          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newTutorial() {
    this.setState({
      id: null,
      title: "",
      duedate: "",
      priority: "",
      label: "",
      status: "", 
      description: "",
      published: false,

      submitted: false
    });
  }

  componentDidMount(){
    this.loadSeeder();
  }

  render() {
    console.log('ENTERED');
    console.log(this.state);
    const {labels, statuses, priorities } = this.state;

    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newTutorial}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={this.state.title}
                onChange={this.onChangeTitle}
                name="title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="duedate">Due Date</label>
              <input
                type="date"
                className="form-control"
                id="duedate"
                required
                value={this.state.duedate}
                onChange={this.onChangeDuedate}
                name="duedate"
              />
            </div>

            <div className="form-group">
              <label htmlFor="priority">Priority
              <select
                className="form-control"
                id="priority"
                required
                value={this.state.priority}
                onChange={this.onChangePriority}
                name="priority">
                {priorities.map(priority =>(
                  // <option value="1">1234</option>
                  <option key={priority.id} value={priority['id']}>{priority['name']}</option>
                ))}
              </select>
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="label">Label
              <select
                className="form-control"
                id="label"
                required
                value={this.state.label}
                onChange={this.onChangeLabel}
                name="label">
                
                {labels.map(label =>(
                  <option key={label.id} value={label.id}>{label.name}</option>
                ))}
              </select>
              </label>
            </div>

            <div className="form-group">
              <label htmlFor="status">Status
              <select
                className="form-control"
                id="status"
                required
                value={this.state.status}
                onChange={this.onChangeStatus}
                name="status">
                
                {statuses.map(status =>(
                  <option key={status.id} value={status.id}>{status.name}</option>
                ))}
              </select>
              </label>
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              < textarea
                className="form-control"
                id="description"
                required
                value={this.state.description}
                onChange={this.onChangeDescription}
                name="description"
              />
            </div>

            <button onClick={this.saveTutorial} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
