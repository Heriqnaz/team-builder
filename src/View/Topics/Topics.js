import * as React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {getTopicsData, voteForTopic, createTopic, deleteTopic} from "../../Redux/Actions/topics";
import {Button, FormControl, InputGroup, ListGroup} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faThumbsUp, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";


class Topics extends React.Component {

  state = {
    newTopicName: ''
  }

  componentDidMount() {
    this.props.getTopicsData();
  }

  handelChangeTopicName = (event) => {
    this.setState({
      newTopicName: event.target.value
    })
  }

  handelCreateNewTopic = () => {
    this.props.createNewTopic(this.state.newTopicName);
    this.setState({newTopicName: ''});
  }

  handelDeleteTopic = (id) => {
    return (() => {
      this.props.deleteTopic(id);
    })
  }

  votedByMe = (id, bool) => {
    return (() => {
      const type = bool ? "unlike" : "like";
      this.props.voteForTopic(id, type);
    })
  }

  render() {
    return (
      !this.props.token && !localStorage.getItem('token') ?  <Redirect to="/login" />:
        <div>
          <ListGroup>
            {this.props.topicsIsLoading ? <div className="spinner-border text-primary m-auto"></div> :
              this.props.topics && this.props.topics.length && this.props.topics.map((topic) => (
                <ListGroup.Item variant="info" key={topic.id}>
                  {topic.title}
                  <Button variant={topic.votingsCount ? "success" : 'danger'} className="float-right">{topic.votingsCount}</Button>
                  <Button variant={topic.votedByMe ? "primary" : 'light'} className="float-right" onClick={this.votedByMe(topic.id, topic.votedByMe)}><FontAwesomeIcon icon={faThumbsUp} /></Button>
                  <Button variant="primary" className={topic.canDelete ? "float-right" : "d-none"} onClick={this.handelDeleteTopic(topic.id)}><FontAwesomeIcon icon={faTrash} /></Button>
                </ListGroup.Item>
              ))}
          </ListGroup>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Recipient's username"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              value={this.state.newTopicName}
              onChange={this.handelChangeTopicName}
            />
            <InputGroup.Append>
              <Button variant="primary" disabled={!this.state.newTopicName} onClick={this.handelCreateNewTopic} ><FontAwesomeIcon icon={faPlus} /></Button>
            </InputGroup.Append>
          </InputGroup>
        </div>


    )
  }

}

const mapStateToProps = (state) => {
  return {
    topics: state.topics,
    topicsIsLoading: state.topicsIsLoading,
    token: state.token
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTopicsData: () => dispatch(getTopicsData()),
    voteForTopic: (id, type) => dispatch(voteForTopic(id, type)),
    createNewTopic: (title) => dispatch(createTopic(title)),
    deleteTopic: (id) => dispatch(deleteTopic(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Topics);