import React, { Component } from "react";
import TeamDataService from "../../services/teams.service";
import SeederDataService from "../../services/seeder.service";
import { Link } from "react-router-dom";
import AuthService from "../../services/auth.service";

export default class AddTeam extends Component {
  constructor(props) {

    super(props);

    this.loadAllUsersSeeder = this.loadAllUsersSeeder.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeMember = this.onChangeMember.bind(this);
    this.addMember = this.addMember.bind(this);

    this.saveTeam = this.saveTeam.bind(this);
    this.newTeam = this.newTeam.bind(this);

    this.contactSubmit = this.contactSubmit.bind(this);
    this.handleValidation = this.handleValidation.bind(this);

    this.user = AuthService.getCurrentUser();

    this.state = {
      Name: "", // Team's name
      moderator_name: this.user.name, // Current user name
      allUsers: [], // List of objects { id, name, email}
      user_list: [this.user.email], // List of emails of team members
      newMember: "",
      errors: {},
      submitted:false,
    };
  }

  removeModeratorFromList(user){
    var cur_user = AuthService.getCurrentUser();
    return user.id !== cur_user.id
  }

  loadAllUsersSeeder(){
    SeederDataService.getAllUsers().then(response => {
    console.log(" All Users  ", response.data);
    var allUserButMe = response.data.filter(this.removeModeratorFromList);
    console.log(allUserButMe);
      this.setState({
        allUsers: allUserButMe,
        newMember: allUserButMe[0].email,
      });
    })
 }
 
 handleValidation(){
    let Name = this.state.Name;
    let errors = {};
    let formIsValid = true;

    console.log("nameeeee",Name);
    if(!Name){
      formIsValid = false;
      errors["Name"] = "Feild is required.";
    }

    if(typeof Name !== "undefined"){
      if(!(Name.length>0)){
        formIsValid = false;
        errors["Name"] = "Required*";
      }        
    }

    this.setState({errors: errors});
    return formIsValid;
  }

  contactSubmit(e){
    e.preventDefault();
    if(this.handleValidation()){
      var data = {
      name: this.state.Name,
    //   moderator_name: this.state.moderator_name,
      user_list: this.state.user_list,
    };
    
    TeamDataService.create(data)
      .then(response => {
        this.setState({
          Name: response.data.Name,
          submitted: true,
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
    }else{
      /*alert("Please complete the mandatory feilds.")*/
    }
  }

 onChangeName(e) {
    this.setState({
      Name: e.target.value
    });
  }

//  Add the memebr to the user_list
  onChangeMember(e) {
    this.setState({
      newMember: e.target.value,
    });
  }
  
  unique(value, index, self){
    return self.indexOf(value) === index
  }
      
  addMember() {
    this.setState(prevState => ({
      user_list: [...prevState.user_list, prevState.newMember].filter(this.unique),
    }));
  }

  saveTeam() {
    var data = {
      name: this.state.Name,
    //   moderator_name: this.state.moderator_name,
      user_list: this.state.user_list,
    };
    
    TeamDataService.create(data)
      .then(response => {
        this.setState({
          Name: response.data.Name,
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newTeam() {
    this.setState({
      id: null,
      Name: "",
      submitted: false,
    });
  }


  componentDidMount(){
    console.log("Component did mount");
    this.loadAllUsersSeeder(this.props.match.params.id);
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
            <Link to={"/teams/list"} className="btn btn-success">
              View All Teams
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
                required
                value={this.state.Name}
                onChange={this.onChangeName}
                name="Name"
              />
              <span style={{color: "red"}}>{this.state.errors["Name"]}</span>
            </div>

            <div className="form-group">
              <label htmlFor="Name">Moderator</label>
              <input
                type="text"
                readOnly
                className="form-control"
                id="moderator_name"
                required
                value={this.state.moderator_name}
                name="Name"
              />
            </div>



            <div className="form-group">
              <label htmlFor="team_member"><b>Add a team member</b>

              <div class="row">
                <div class="col-md-10">
                    <select
                    className="form-control"
                    id="user_list"
                    value= {this.state.newMember}
                    onChange={this.onChangeMember}
                    name="user_list">
                    {allUsers.map(user =>(
                    <option key={user.email} value={user['email']}>{user['email']}</option>
                    ))}
                    </select>
                </div>
                <div class="col-md-2">
                    <button class="btn btn-success" onClick={this.addMember}>Add</button>
                </div>

              </div>
              </label>
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
            <Link to={"/teams/list"} onClick={this.contactSubmit} className="btn btn-success">
              Submit
            </Link>
          </div>
        )}
      </div>
    );
  }
}
