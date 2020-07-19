import * as React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {getTeamsData} from "../../Redux/Actions/teams";
import {Card, ListGroup} from "react-bootstrap";


class Home extends React.Component {
  state = {
    newTopicName: ''
  }

  componentDidMount() {
    this.props.getTeamsData();
  }

  render() {
    return (
      !this.props.token && !localStorage.getItem('token') ?  <Redirect to="/login" />:
        <div>
          {this.props.teamsIsLoading ? <div className="spinner-border text-primary m-auto"></div> :
            this.props.teams && this.props.teams.length && this.props.teams.map((team) => (
              <Card className="text-center" key={team.id}>
                <Card.Header>{team.name}</Card.Header>
                <Card.Body>
                  <Card.Title>{team.topic}</Card.Title>
                  <Card.Text>
                    Members :
                    <ListGroup>
                      {team.members && team.members.length && team.members.map((member) => (
                        <ListGroup.Item variant="info" key={member.firstName + Math.floor(Math.random() * 100)}>{`${member.firstName} ${member.lastName}`}</ListGroup.Item>
                    ))}
                  </ListGroup>
                  </Card.Text>
                </Card.Body>
              </Card>
            ))}
        </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    teams: state.teams,
    teamsIsLoading: state.teamsIsLoading,
    token: state.token
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTeamsData: () => dispatch(getTeamsData()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);