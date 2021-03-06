import React, { Component } from "react";
import TeamDataService from "../../services/teams.service";
import { Link } from "react-router-dom";
import moment from 'moment';

export default class Teams extends Component {
  constructor(props) {
    super(props);
    // this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveTeams = this.retrieveTeams.bind(this);
    this.refreshList = this.refreshList.bind(this);
    // this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      teams: [],
      searchTitle: "",
    };
  }

  deleteTeam(id) {
    const team_id = this.state.team_id; 
    TeamDataService.delete(id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/teams/list');
        this.retrieveTeams();
      })
      .catch(e => {
        console.log(e);
      });
  }

  componentDidMount() {
    this.refreshList();
  }

//   onChangeSearchTitle(e) {
//     const searchTitle = e.target.value;

//     this.setState({
//       searchTitle: searchTitle
//     });
//   }

  retrieveTeams() {
    console.log("inside retrwice");
    setTimeout(() => {
      TeamDataService.getAll()
        .then(response => {
          this.setState({
            teams: response.data
          });
          console.log("THESE ARE THE TEAMS", response.data);
        })
        .catch(e => {
          console.log(e);
        });
      },1000);
  }

  refreshList() {
    this.retrieveTeams();
  }

//   searchTitle() {
//     TeamDataService.findByTitle(this.state.searchTitle)
//       .then(response => {
//         this.setState({
//           teams: response.data
//         });
//         console.log("SEARCH TITLE THING ", response.data);
//       })
//       .catch(e => {
//         console.log(e);
//       });
//   }

  render() {
    const { searchTitle, teams} = this.state;

    return (
      <div className="list row">
        
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        <div className="col-md-10">
          <div className="col-md-13 ">
          <div className="input-group mb-3">
            <div className="mr-auto">
            <h4>Teams List</h4>
            </div>
            <div className="input-group-append ml-auto">
             <Link to={"/teams/create/"}
            className="float-right m-1 btn btn-sm btn-success"
            
          >
            Add
          </Link>
            </div>
          </div>
        </div>
          <ul className="list-group">
             <li className="list-group-item" style={{backgroundColor:"azure"}}>
                <div className="task-title row">
                    <div className="col-md-3 ListHeading">
                        <span className="">Team Name</span>
                    </div>
                    <div class="col-md-3">
                        <span className="ListHeading">Moderator</span>
                    </div>
                    <div class="col-md-6 pull-right row">  
                        <div class="col-md-4">
                        </div>                     
                        <div class="col-md-3">
                            <span className="ListHeading">
                              Tasks
                            </span>
                        </div>
                        <div class="col-md-3">
                            <span className="ListHeading">
                              Open
                            </span>
                        </div>
                        <div class="col-md-2" >
                          <span className="ListHeading" style={{align:"right"}}>
                            Delete
                          </span>
                        </div>
                    </div>
                </div>
            </li>
            {teams &&
              teams.map((team, index) => (
                <li className="list-group-item ">
                <div class="task-title row">
                    <div class="col-md-3">
                        <span class="task-title-sp Highlight">{team.name}   </span>
                    </div>
                    <div class="col-md-3">
                        <span class="badge bg-theme">{team.moderator_name}    </span>
                    </div>
                    <div class="col-md-6 pull-right row">
                        <div class="col-md-4">
                        </div>
                        <div class="col-md-3">
                            <Link to={"/teams/"+team.id+"/tasks/"} className="badge badge-primary">
                              Tasks
                            </Link>
                        </div>

                        <div class="col-md-3">
                            <Link to={"/teams/" + team.id+"/view"} className="badge badge-primary">
                              Open
                            </Link>
                        </div>
                        <div class="col-md-2">
                          <button className = "badge badge-danger Hovering buttonAsALink" onClick={() =>
                          {
                            this.deleteTeam(team.id);
                          }}
                          >
                              Delete
                          </button>
                        </div>
                    </div>
                </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    );
  }
}
