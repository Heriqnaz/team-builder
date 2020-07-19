import axios from 'axios';
import {baseUrl} from "../../constants";

export function projectsHaveError(bool) {
  return {
    type: 'PROJECTS_HAVE_ERROR',
    projectsHasError: bool
  };
}

export function projectsAreLoading(bool) {
  return {
    type: 'PROJECTS_ARE_LOADING',
    projectsIsLoading: bool
  };
}


export function projectsFetchDataSuccess(projects) {
  return {
    type: 'PROJECTS_FETCH_DATA_SUCCESS',
    projects
  };
}

export function getProjectsData() {
  return (dispatch) => {
    dispatch(projectsAreLoading(true));

    axios.get(`${baseUrl}projects`, {headers: {token: localStorage.getItem('token')}})
      .then((response) => {
        if (response.status !== 200) {
          throw Error(response.statusText);
        }

        dispatch(projectsAreLoading(false));

        return response;
      })
      .then((response) => dispatch(projectsFetchDataSuccess(response.data)))
      .catch(() => dispatch(projectsHaveError(true)));
  };
}

export function voteForProject(id, type) {
  return (dispatch) => {
    dispatch(projectsAreLoading(true));

    axios.post(`${baseUrl}projects/${id}/voting`, {type}, {headers: {token: localStorage.getItem('token')}})
      .then((response) => {
        if (response.status !== 200) {
          throw Error(response.statusText);
        }

        dispatch(projectsAreLoading(false));

        return response;
      })
      .then((response) => dispatch(getProjectsData()))
      .catch(() => dispatch(projectsHaveError(true)));
  };
}