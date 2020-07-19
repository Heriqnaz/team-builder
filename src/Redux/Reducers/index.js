import { combineReducers } from 'redux';
import {
  companies,
  companiesHaveError,
  companiesAreLoading,
  loginAreLoading,
  loginHaveError,
  user,
  registerAreLoading,
  registerHaveError,
  token,
  topics,
  topicsIsLoading,
  projects,
  projectsIsLoading,
  teams,
  teamsIsLoading,
  userAreLoading
}
  from './reducer';

export default combineReducers({
  companies,
  companiesHaveError,
  companiesAreLoading,
  loginAreLoading,
  loginHaveError,
  user,
  registerHaveError,
  registerAreLoading,
  token,
  topics,
  topicsIsLoading,
  projects,
  projectsIsLoading,
  teams,
  teamsIsLoading,
  userAreLoading
});