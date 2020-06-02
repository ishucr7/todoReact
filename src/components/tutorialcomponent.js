import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";

export default class Tutorial extends Component {
  constructor(props) {
    super(props);
    this.getTutorial = this.getTutorial.bind(this);

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
      message: ""
    };
  }

  componentDidMount() {
    this.getTutorial(this.props.match.params.id);
  }

  getTutorial(id) {
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

  render() {
     const { currentTutorial } = this.state;

    return (
      <div>
        {currentTutorial ? (
          <div className="edit-form">
            <h4>Task</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  readOnly
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentTutorial.title}
                />
              </div>
              <div className="form-group">
                <label htmlFor="duedate">Due Date</label>
                <input
                  readOnly
                  type="date"
                  className="form-control"
                  id="duedate"
                  value={currentTutorial.due_date}
                />
              </div>
              <div className="form-group">
                <label htmlFor="priority">Priority</label>
                <input
                  readOnly
                  type="text"
                  className="form-control"
                  id="priority"
                  value={currentTutorial.priority_id}
                />
              </div>
              <div className="form-group">
                <label htmlFor="label">Label</label>
                <input
                  readOnly
                  type="text"
                  className="form-control"
                  id="label"
                  value={currentTutorial.label_id}
                />
              </div>
              <div className="form-group">
                <label htmlFor="status">Status</label>
                <input
                  readOnly
                  type="text"
                  className="form-control"
                  id="status"
                  value={currentTutorial.status_id}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  readOnly
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentTutorial.description}
                />
              </div>

            </form>

            {currentTutorial.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteTutorial}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateTutorial}
            >
              Update
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
