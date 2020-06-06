import React, { Component } from "react";
import TaskDataService from "../../../services/tasks.service";
import SeederDataService from "../../../services/seeder.service";
import TeamDataService from "../../../services/teams.service";
import { Link } from "react-router-dom";

export default class AddTask extends Component {
  constructor(props) {

    super(props);

    this.loadSeeder = this.loadSeeder.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);

    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuedate = this.onChangeDuedate.bind(this);
    
    this.onChangeAssigneeId = this.onChangeAssigneeId.bind(this);
    this.onChangeLabel = this.onChangeLabel.bind(this);
    this.onChangePriority = this.onChangePriority.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);

    this.saveTask = this.saveTask.bind(this);

    this.state = {
      id: null,
      title: "",
      due_date: null,
      // name
      priority: "",
      label: "",
      status: "",
      // ids 
      priority_id: "",
      label_id: "",
      status_id: "", 
      description: "",
      statuses: [],
      labels: [],
      priorities: [],
      team_id: this.props.match.params.id,
      assignee_id: "",
      allUsers: [],
      task_id: this.props.match.params.taskId,
    };
  }


  loadSeeder(){
    console.log("Inside load Seeder");
    SeederDataService.getAllLabels().then(response => {
      console.log("Labels", response);
      this.setState({
        labels:response.data,
        label_id: response.data[0]['id'],
      });
    })

    SeederDataService.getAllStatuses().then(response => {
      console.log("Statuses ", response);
      this.setState({
        statuses:response.data,
        status_id: response.data[0]['id'],
      });
    })

    SeederDataService.getAllPriorities().then(response => {
      console.log("Priorities" ,response);
      this.setState({
        priorities:response.data,
        priority_id: response.data[0]['id'],
      });
    })

    const team_id = this.props.match.params.id;

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

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangeDuedate(e) {
    this.setState({
      due_date: e.target.value
    });
  }

  onChangePriority(e) {
    this.setState({
      priority_id: e.target.value
    });
  }

  onChangeLabel(e) {
    this.setState({
      label_id: e.target.value
    });
  }
  onChangeAssigneeId(e){
    this.setState({
      assignee_id: e.target.value
    });
  }

  onChangeStatus(e) {
    this.setState({
      status_id: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  saveTask() {
    var data = {
      title: this.state.title,
      due_date: this.state.due_date,
      priority_id: this.state.priority_id,
      status_id: this.state.status_id,
      label_id: this.state.label_id,
      description: this.state.description,
      team_id: this.state.team_id,
      assignee_id: (this.state.assignee_id!=="" ? this.state.assignee_id : null)
    };
    
    console.log("Before saving it " ,data);
    TaskDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          due_date: response.data.due_date,
          priority_id: response.data.priority_id,
          label_id: response.data.label_id,
          status_id: response.data.status_id, 
          description: response.data.description,
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  componentDidMount(){
    this.loadSeeder();
  }

  render() {
    console.log('ENTERED');
    console.log(this.state);
    const {labels, team_id, statuses, allUsers, priorities } = this.state;

    return (
      <div className="submit-form backNone db-white">
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
              <label htmlFor="due_date">Due Date</label>
              <input
                type="date"
                className="form-control"
                id="due_date"
                value={this.state.due_date}
                onChange={this.onChangeDuedate}
                name="due_date"
              />
            </div>

            <div className="form-group">
              <label htmlFor="assignee">Assigned To:
              <select
                className="form-control"
                id="assignee"
                required
                value={this.state.assignee_id}
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
              <label htmlFor="priority">Priority
              <select
                className="form-control"
                id="priority"
                required
                value={this.state.priority_id}
                onChange={this.onChangePriority}
                name="priority">
                {priorities.map(priority =>(
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
                value={this.state.label_id}
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
                value={this.state.status_id}
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

            <Link to={"/teams/"+ team_id + "/tasks/"} onClick={this.saveTask} className="btn btn-success">
              Submit
            </Link>
          </div>
      </div>
    );
  }
}
