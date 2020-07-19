import axios from 'axios';
import {baseUrl} from "../../constants";

export function topicsHaveError(bool) {
  return {
    type: 'TOPICS_HAVE_ERROR',
    topicsHasError: bool
  };
}

export function topicsAreLoading(bool) {
  return {
    type: 'TOPICS_ARE_LOADING',
    topicsIsLoading: bool
  };
}


export function topicsFetchDataSuccess(topics) {
  return {
    type: 'TOPICS_FETCH_DATA_SUCCESS',
    topics
  };
}

export function getTopicsData() {
  return (dispatch) => {
    dispatch(topicsAreLoading(true));

    axios.get(`${baseUrl}topics`, {headers: {token: localStorage.getItem('token')}})
      .then((response) => {
        if (response.status !== 200) {
          throw Error(response.statusText);
        }

        dispatch(topicsAreLoading(false));

        return response;
      })
      .then((response) => dispatch(topicsFetchDataSuccess(response.data)))
      .catch(() => dispatch(topicsHaveError(true)));
  };
}

export function voteForTopic(id, type) {
  return (dispatch) => {
    dispatch(topicsAreLoading(true));

    axios.post(`${baseUrl}topics/${id}/voting`, {type}, {headers: {token: localStorage.getItem('token')}})
      .then((response) => {
        if (response.status !== 200) {
          throw Error(response.statusText);
        }

        dispatch(topicsAreLoading(false));

        return response;
      })
      .then((response) => dispatch(getTopicsData()))
      .catch(() => dispatch(topicsHaveError(true)));
  };
}

export function createTopic(title) {
  return (dispatch) => {
    dispatch(topicsAreLoading(true));

    axios.post(`${baseUrl}topics`, {title}, {headers: {token: localStorage.getItem('token')}})
      .then((response) => {
        if (response.status !== 200) {
          throw Error(response.statusText);
        }

        dispatch(topicsAreLoading(false));

        return response;
      })
      .then((response) => dispatch(getTopicsData()))
      .catch(() => dispatch(topicsHaveError(true)));
  };
}
export function deleteTopic(id) {
  return (dispatch) => {
    dispatch(topicsAreLoading(true));

    axios.delete(`${baseUrl}topics/${id}`,  {headers: {token: localStorage.getItem('token')}})
      .then((response) => {
        if (response.status !== 200) {
          throw Error(response.statusText);
        }

        dispatch(topicsAreLoading(false));

        return response;
      })
      .then((response) => dispatch(getTopicsData()))
      .catch(() => dispatch(topicsHaveError(true)));
  };
}