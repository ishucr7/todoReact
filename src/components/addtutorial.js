import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";
<<<<<<< Updated upstream
=======
import SeederDataService from "../services/seeder.service";
import { Link } from "react-router-dom";

>>>>>>> Stashed changes

export default class AddTutorial extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
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
      published: false,

      submitted: false
    };
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
      duedate: this.state.duedate,
      priority: this.state.priority,
      label: this.state.label,
      status: this.state.status, 
      description: this.state.description
    };

    TutorialDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
<<<<<<< Updated upstream
          duedate: response.data.duedate,
          priority: response.data.priority,
          label: response.data.label,
          status: response.data.status, 
=======
          duedate: response.data.due_date,
          priority: response.data.priority_id,
          label: response.data.label_id,
          status: response.data.status_id, 
>>>>>>> Stashed changes
          description: response.data.description,
          published: response.data.published,

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

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <Link to={"/tutorials/"} className="btn btn-success">
              View All tasks
            </Link>
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
                value={this.state.duedate}
                onChange={this.onChangeDueddate}
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
                <option value="low">low</option>
                <option value="medium">medium</option>
                <option value="high">high</option>
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
                <option value="personal">Personal</option>
                <option value="work">Work</option>
                <option value="shopping">Shopping</option>
                <option value="others">Others</option>
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
                <option value="new">New</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
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

            <Link to={"/tutorials/"} onClick={this.saveTutorial} className="btn btn-success">
              Submit
            </Link>
          </div>
        )}
      </div>
    );
  }
}
