import React, { Component } from "react";
import TeamDataService from "../../services/teams.service";
import SeederDataService from "../../services/seeder.service";
import { Link } from "react-router-dom";
import AuthService from "../../services/auth.service";

export default class ViewTeam extends Component {
  constructor(props) {

    super(props);

    this.loadTeamData = this.loadTeamData.bind(this);

    this.user = AuthService.getCurrentUser();

    this.state = {
      Name: "", // Team's name
      moderator_name: this.user.name, // Current user name
      allUsers: [], // List of objects { id, name, email}
      user_list: [], // List of emails of team members
      newMember: "",
    };
  }

  loadTeamData(id){
    TeamDataService.getTeam(id).then(response => {
      this.setState({
        Name: response.data.Name,
        user_list: response.data.user_list,
      });
    })
 }
  

  componentDidMount(){
    console.log("Component did mount");
    this.loadTeamData(this.props.match.params.id);
  }

  render() {
    console.log('ENTERED');
    console.log(this.state);
    const {allUsers, moderator_name, Name} = this.state;

    return (
      <div className="submit-form db-white">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <Link to={"/teams/"} className="btn btn-success">
              View All tasks
            </Link>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="Name">Name</label>
              <input
                type="text"
                className="form-control"
                id="Name"
                readOnly
                value={this.state.Name}
                // onChange={this.onChangeName}
                name="Name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="Name">Moderator</label>
              <input
                type="text"
                readOnly
                className="form-control"
                id="moderator_name"
                // required
                value={this.state.moderator_name}
                name="Name"
              />
            </div>

            {this.state.user_list ?
                <div>
                <label><b>List of memebers</b></label>
                {this.state.user_list.map(user_email => (
                    <div className="form-group">
                        <span>{user_email}</span>
                      </div>
                ))}
                </div>
                : "" 
            }
            <Link to={"/teams/list"} onClick={this.saveTeam} className="btn btn-success">
              Go back
            </Link>
          </div>
        )}
      </div>
    );
  }
}
