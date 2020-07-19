import axios from 'axios';
import {baseUrl} from "../../constants";

export function teamsHaveError(bool) {
  return {
    type: 'TEAMS_HAVE_ERROR',
    teamsHasError: bool
  };
}

export function teamsAreLoading(bool) {
  return {
    type: 'TEAMS_ARE_LOADING',
    teamsIsLoading: bool
  };
}


export function teamsFetchDataSuccess(teams) {
  return {
    type: 'TEAMS_FETCH_DATA_SUCCESS',
    teams
  };
}

export function getTeamsData() {
  return (dispatch) => {
    dispatch(teamsAreLoading(true));

    axios.get(`${baseUrl}teams`, {headers: {token: localStorage.getItem('token')}})
      .then((response) => {
        if (response.status !== 200) {
          throw Error(response.statusText);
        }

        dispatch(teamsAreLoading(false));

        return response;
      })
      .then((response) => dispatch(teamsFetchDataSuccess(response.data)))
      .catch(() => dispatch(teamsHaveError(true)));
  };
}