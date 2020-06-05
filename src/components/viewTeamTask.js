import React, { Component } from "react";
import TaskDataService from "../services/tutorial.service";
import SeederDataService from "../services/seeder.service";
import TeamDataService from "../services/teams.service";
import moment from 'moment';

export default class TeamTask extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDuedate = this.onChangeDuedate.bind(this);
    this.onChangePriority = this.onChangePriority.bind(this);
    this.onChangeLabel = this.onChangeLabel.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onChangeComment = this.onChangeComment.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeAssigneeId = this.onChangeAssigneeId.bind(this);

    this.getTask = this.getTask.bind(this);
    this.loadSeeder = this.loadSeeder.bind(this);
    
    this.updateTask = this.updateTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);

    this.state = {
      currentTask: {
        id: this.props.match.params.taskId,
        title: "",
        duedate: "",
        priority: "",
        label: "",
        status: "",
        description: "",
        published: false,
        newComment: "",
        oldComments: null,
        assignee_id: "",
      },
      message: "",
      statuses: [],
      labels: [],
      priorities: [],
      allUsers: [],
      team_id: this.props.match.params.id,
    //   task_id: this.props.match.params.taskId,
    };
  }

  onChangeAssigneeId(e){
    const ass = e.target.value;
    this.setState(function(prevState) {
        return {
          currentTask: {
            ...prevState.currentTask,
            assignee_id: ass
          }
        };
      });
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
    const duedate = e.target.value;

    this.setState(function(prevState) {
      return {
        currentTask: {
          ...prevState.currentTask,
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
        currentTask: {
          ...prevState.currentTask,
          priority: priority
        }
      };
    });
  }

  onChangeLabel(e) {
    const label = e.target.value;

    this.setState(function(prevState) {
      return {
        currentTask: {
          ...prevState.currentTask,
          label: label
        }
      };
    });
  }

  onChangeStatus(e) {
    const status = e.target.value;

    this.setState(function(prevState) {
      return {
        currentTask: {
          ...prevState.currentTask,
          status: status
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
        //currentTask.priority: response.data[0]['id'],
      });
    })

    const team_id = this.state.team_id;

    TeamDataService.getTeam(team_id).then(response => {
        var arr = [];
        for(var i=0;i<response.data.user_list.length; i++){
            arr.push({
                'id': response.data.user_ids[i].user_id,
                'email': response.data.user_list[i]
            });
        }
        this.setState({
          allUsers: arr // basically members of this team.
        });
      })
  }

  componentDidMount() {
    this.loadSeeder();
    this.getTask(this.props.match.params.taskId);
    this.getComments(this.props.match.params.taskId);
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

  getComments(id) {
    // console.log("****",id);
    setTimeout(() => {
    TaskDataService.getComments(id)
      .then(response => {
        this.setState(function(prevState) {
          return {
            currentTask: {
              ...prevState.currentTask,
              oldComments: response.data,
            }
          };
        });
      console.log("COMMENTS   " , response.data);
      console.log(this.state);
      })
      .catch(e => {
        console.log(e);
      });
    }, 1000);
}


  updateTask() {
    // (this.state.currentTask.assignee_id!=="" ? this.state.assignee_id : null)
    const assignee_id = ((this.state.currentTask.assignee_id && this.state.currentTask.assignee_id.length) ?
        this.state.currentTask.assignee_id : null)
    // console.log()
      this.setState( prevState => ({
        currentTask: {
            ...prevState.currentTask,
            assignee_id: assignee_id
        }
      }));

      TaskDataService.update(
        this.state.currentTask.id,
        this.state.currentTask,
        // this.state.task_id
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

  deleteTask() { 
    console.log("delete id",this.state.currentTask.title);   
    TaskDataService.delete(this.state.currentTask.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/tutorials');
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
     const { currentTask,labels, allUsers, statuses, priorities } = this.state;
    console.log('Lets see the state', this.state);
    return (
      <div>
        {currentTask ? (
          <div className="edit-form db-white">
            <h4>Task</h4>
            <form>
              <div className="form-group task-title" >
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  onChange={this.onChangeTitle}
                  value={currentTask.title}
                />
              </div>
              <div className="form-group task-title">
                <label htmlFor="duedate">Due Date</label>
                <input
                  type="date"
                  className="form-control"
                  id="duedate"
                  value={currentTask.duedate ? moment(currentTask.duedate).format("YYYY-MM-DD") : null}
                  onChange={this.onChangeDuedate}

                />
              </div>

              <div className="form-group">
              <label htmlFor="assignee">Assigned To:
              <select
                className="form-control"
                id="assignee"
                required
                value={this.state.currentTask.assignee_id}
                onChange={this.onChangeAssigneeId}
                name="assignee">
                <option key="" value=""> None</option>

                {allUsers.map(user =>(
                  <option key={user.id} value={user['id']}>{user['email']}</option>
                ))}
              </select>
              </label>
            </div>

              <div className="form-group">
                <label htmlFor="priority">Priority</label>
                <select
                className="form-control"
                id="priority"
                required
                value={currentTask.priority}
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
                value={currentTask.label}
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
                value={currentTask.status}
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
                onChange={this.onChangeDescription}
                value={currentTask.description}
                />
              </div>

              <div className="form-group">
              <label htmlFor="Comment">Add Comment</label>
              < textarea
                className="form-control"
                id="newComment"
                value={this.state.newComment}
                onChange={this.onChangeComment}
                name="comment"
              />
            </div>
            </form>
            {currentTask.oldComments ?
            <div className="form-group">
              <label htmlFor="Comment"><b>Comments</b></label>

               {currentTask.oldComments.map(comment =>(
                 <div>
                <label htmlFor="Comment">{comment.created_by}</label>
                <textarea
                className="form-control"
                readOnly
                value={comment.body}
                />
                </div>
               ))}
            </div>
             : "" }


            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteTask}
            >
              Delete Task
            </button>

            <button
              type="submit"
              className="float-right badge badge-success"
              onClick={this.updateTask}
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
