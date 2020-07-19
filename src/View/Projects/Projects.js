import * as React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {getProjectsData, voteForProject} from "../../Redux/Actions/projects";
import {Button, ListGroup} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";

class Projects extends React.Component {

  state = {
    newTopicName: ''
  }

  componentDidMount() {
    this.props.getProjectsData();
  }

  votedByMe = (id, bool) => {
    return (() => {
      const type = bool ? "unlike" : "like";
      this.props.voteForProject(id, type);
    })
  }


  render() {
    return (
      !this.props.token && !localStorage.getItem('token') ?  <Redirect to="/login" />:
        <div>
          <ListGroup>
            {this.props.projectsIsLoading ? <div className="spinner-border text-primary m-auto"></div> :
              this.props.projects && this.props.projects.length && this.props.projects.map((project) => (
                <ListGroup.Item variant="info" key={project.id}>
                  {project.title}
                  <Button variant={project.votedByMe ? "primary" : 'light'} className="float-right" onClick={this.votedByMe(project.id, project.votedByMe)}><FontAwesomeIcon icon={faThumbsUp} /></Button>
                </ListGroup.Item>
              ))}
          </ListGroup>
        </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    projects: state.projects,
    projectsIsLoading: state.projectsIsLoading,
    token: state.token
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProjectsData: () => dispatch(getProjectsData()),
    voteForProject: (id, type) => dispatch(voteForProject(id, type)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Projects);