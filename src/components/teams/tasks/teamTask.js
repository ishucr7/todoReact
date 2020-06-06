import React, { Component } from "react";
import TaskDataService from "../../../services/tasks.service";
import CommentDataService from "../../../services/comments.service";
import SeederDataService from "../../../services/seeder.service";
import TeamDataService from "../../../services/teams.service";
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
    this.deleteComment = this.deleteComment.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeAssigneeId = this.onChangeAssigneeId.bind(this);

    this.addComment = this.addComment.bind(this);
    this.getTask = this.getTask.bind(this);
    this.loadSeeder = this.loadSeeder.bind(this);
    
    this.updateTask = this.updateTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.label_id_mapper = {};
    this.status_id_mapper = {};
    this.priority_id_mapper = {};

    this.state = {
      currentTask: {
        id: this.props.match.params.taskId,
        title: "",
        due_date: "",
        // Names
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
        assignee_id: "",
      },
      message: "",
      statuses: [],
      labels: [],
      priorities: [],
      allUsers: [],
      team_id: this.props.match.params.id,
      task_id: this.props.match.params.taskId,
      newComment: "",
      oldComments: [],
      // label_id_mapper : {},
      // status_id_mapper : {},
      // priority_id_mapper : {},
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
    this.setState({
      newComment: comment,
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
          priority_id: priority_id,
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
      this.setState(prevState => ({
        labels:response.data,
        currentTask: {
          ...prevState.currentTask,
          label_id: response.data[0]['id']
        }
      }));
      console.log("State agter labels seeder, " ,this.state);
    })

    SeederDataService.getAllStatuses().then(response => {
      this.setState(prevState => ({
        statuses:response.data,
        currentTask: {
          ...prevState.currentTask,
          status_id: response.data[0]['id']
        }
      }));
    })

    SeederDataService.getAllPriorities().then(response => {
      this.setState(prevState => ({
        priorities:response.data,
        currentTask: {
          ...prevState.currentTask,
          priority_id: response.data[0]['id']
        }
      }));
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

  addComment(e){
    const task_id = this.state.task_id;
    const new_comment = this.state.newComment;
    var old_comments = this.state.oldComments;
    old_comments.push(new_comment);
    CommentDataService.createComment({
      'body': this.state.newComment,
      'task_id': task_id,
    })
    .then(response => {
      this.setState({
        newComment: "",
        oldComments: old_comments
      });
      
      this.getComments(task_id);
        console.log("yo");
    })
    .catch(e => {
      console.log(e);
    });    
  }

  deleteComment(comment_id){
    console.log("entering delete comment  ", comment_id);
    var old_comments = this.state.oldComments.filter(function(comment){
      return  comment_id !== comment.id;
    });
    CommentDataService.deleteComment(comment_id)
      .then(response=> {
        console.log("Was delete succesfully --- ", response);
        this.setState({
          oldComments: old_comments
      });
    })
    .catch(e =>{
      console.log(e);
    });
  }

  getComments(taskId) {
    setTimeout(() => {
      CommentDataService.getComments(taskId)
      .then(response => {
        this.setState({
          oldComments: response.data,
        });
      })
      .catch(e => {
        console.log(e);
      });
    }, 1000);
}


  updateTask() {
    const team_id = this.state.team_id; 

    const assignee_id = ((this.state.currentTask.assignee_id && this.state.currentTask.assignee_id.length) ?
        this.state.currentTask.assignee_id : null)
      this.setState( prevState => ({
        currentTask: {
            ...prevState.currentTask,
            assignee_id: assignee_id
        }
      }));

      TaskDataService.update(
        this.state.currentTask.id,
        this.state.currentTask,
    )
      .then(response => {
        this.props.history.push('/teams/' + team_id + '/tasks/list');
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteTask() { 
    const team_id = this.state.team_id; 
    TaskDataService.delete(this.state.currentTask.id)
      .then(response => {
        this.props.history.push('/teams/' + team_id + '/tasks/list');
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentTask,labels, allUsers, oldComments, statuses, priorities } = this.state;
    console.log('Lets see the state', this.state);
    return (
      <div>
          <div className="edit-form db-white">
            <h4 className="BlackHeading">Task</h4>
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
                {statuses.map(status =>(
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
              <button
              className="m-1 btn btn-sm btn-danger"
              onClick={this.deleteTask}
            >
              Delete Task
            </button>

            <button
              type="submit"
              className="float-right m-1 btn btn-sm btn-success"
              onClick={this.updateTask}
            >
              Save Changes
            </button>
            <p>{this.state.message}</p>

              <div className="form-group">
                <label htmlFor="Comment"><b>Add Comment</b>
                    <div class="">
                      < textarea
                        className="form-control"
                        id="newComment"
                        value={this.state.newComment}
                        onChange={this.onChangeComment}
                        name="comment"
                      />
                    {/* </div> */}
                    {/* <div class="col-md-2"> */}
                    <div>
                        <button class="btn btn-success MarginTop"  onClick={this.addComment}>Add</button>
                    </div>
                    {/* </div> */}
                  </div>
                </label>
              </div>
            {oldComments ?
            <div className="form-group">
              <label htmlFor="Comment"><b>Comments</b></label>

               {oldComments.map(comment =>(
                 <div>
                    <label htmlFor="Comment">{comment.created_by}</label>
                    <div class="row">
                      <div class="col-md-9">
                        <label htmlFor="time">Last edit: {moment(comment.updatedAt).format("DD-MM-YY h:mm:s a")}</label>
                      </div>
                      <div class="col-md-2" >
                        <label htmlFor="delete"><button className="badge badge-danger mr-2"
                            onClick={() => {
                              this.deleteComment(comment.id)
                            }}
                            > Delete</button>
                        </label>
                      </div>
                    </div>
                  <textarea
                  className="form-control"
                  readOnly
                  value={comment.body}
                  />
                </div>
               ))}
            </div>
             : "" }


            
          </div>
      </div>
    );
  }
}
