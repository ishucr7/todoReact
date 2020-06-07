import React, { Component } from "react";
import TaskDataService from "../../services/tasks.service";
import SeederDataService from "../../services/seeder.service";
import moment from 'moment';

export default class Task extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDuedate = this.onChangeDuedate.bind(this);
    this.onChangePriority = this.onChangePriority.bind(this);
    this.onChangeLabel = this.onChangeLabel.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onChangeComment = this.onChangeComment.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);

    this.getTask = this.getTask.bind(this);
    this.loadSeeder = this.loadSeeder.bind(this);
    
    this.updateTask = this.updateTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);

    this.state = {
      currentTask: {
        id: null,
        title: "",
        due_date: "",
        // names
        priority: "",
        label: "",
        status: "",
        // ids
        priority_id: "",
        label_id: "",
        status_id: "",

        description: "",
        published: false,
        newComment: "",
        oldComments: null,
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
        currentTask: {
          ...prevState.currentTask,
          title: title
        }
      };
    });
  }

  onChangeComment(e) {
    const comment = e.target.value;

    this.setState(function(prevState) {
      return {
        currentTask: {
          ...prevState.currentTask,
          newComment: comment
        }
      };
    });
  }

  onChangeDuedate(e) {
    const due_date = e.target.value;

    this.setState(function(prevState) {
      return {
        currentTask: {
          ...prevState.currentTask,
          due_date: due_date
        }
      };
    });
  }

  onChangePriority(e) {
    const priority_id = e.target.value;
    this.setState(function(prevState) {
      return {
        currentTask: {
          ...prevState.currentTask,
          priority_id: priority_id
        }
      };
    });
  }

  onChangeLabel(e) {
    const label_id = e.target.value;

    this.setState(function(prevState) {
      return {
        currentTask: {
          ...prevState.currentTask,
          label_id: label_id
        }
      };
    });
  }

  onChangeStatus(e) {
    const status_id = e.target.value;

    this.setState(function(prevState) {
      return {
        currentTask: {
          ...prevState.currentTask,
          status_id: status_id
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;

    this.setState(prevState => ({
      currentTask: {
        ...prevState.currentTask,
        description: description
      }
    }));
  }


  loadSeeder(){
    console.log("Inside load Seeder");
    SeederDataService.getAllLabels().then(response => {
      console.log("Labels", response);
      this.setState(prevState => ({
        labels:response.data,
        currentTask: {
          ...prevState.currentTask,
          label_id: response.data[0]['id'],
        }
      }));
    })

    SeederDataService.getAllStatuses().then(response => {
      console.log("Statuses ", response);
      this.setState(prevState => ({
        statuses: response.data,
        currentTask: {
          ...prevState.currentTask,
          status_id: response.data[0]['id'],
        }
      }));
    })

    SeederDataService.getAllPriorities().then(response => {
      console.log("Priorities" ,response);
      this.setState(prevState => ({
        priorities: response.data,
        currentTask: {
          ...prevState.currentTask,
          priority_id: response.data[0]['id'],
        }
      }));
    })
  }

  componentDidMount() {
    this.loadSeeder();
    this.getTask(this.props.match.params.id);
  }

  getTask(id) {
    console.log("****",id);
    TaskDataService.get(id)
      .then(response => {
        this.setState({
          currentTask: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }



  updateTask() {
    TaskDataService.update(
      this.state.currentTask.id,
      this.state.currentTask
    )
      .then(response => {
        console.log(response.data);
        this.props.history.push('/me/tasks/list');
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteTask() { 
    TaskDataService.delete(this.state.currentTask.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/me/tasks/list');
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
     const { currentTask,labels, statuses, priorities } = this.state;
    console.log('Lets see the state', this.state);
    return (
      <div>
          <div className="edit-form db-white">
            <h4 className="BlackHeading">Task</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  onChange={this.onChangeTitle}
                  value={currentTask.title}
                />
              </div>
              <div className="form-group">
                <label htmlFor="due_date">Due Date</label>
                <input
                  type="date"
                  className="form-control"
                  id="due_date"
                  value={currentTask.due_date ? moment(currentTask.due_date).format("YYYY-MM-DD") : null}
                  onChange={this.onChangeDuedate}

                />
              </div>
              <div className="form-group">
                <label htmlFor="priority">Priority</label>
                <select
                className="form-control"
                id="priority"
                required
                value={currentTask.priority_id}
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
                value={currentTask.label_id}
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
                value={currentTask.status_id}
                onChange={this.onChangeStatus}
                name="status">
                {priorities.map(status =>(
                  <option key={status.id} value={status.id}>{status.name}</option>
                ))}
              </select>
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  type="text"
                  className="form-control"
                  id="description"
                onChange={this.onChangeDescription}
                value={currentTask.description}
                />
              </div>

            </form>


            <button
              className="m-1 btn btn-sm btn-danger"
              onClick={this.deleteTask}
            >
              Delete
            </button>

            <button
              type="submit"
              className="float-right m-1 btn btn-sm btn-success"
              onClick={this.updateTask}
            >
              Save
            </button>
          </div>
      </div>
    );
  }
}
