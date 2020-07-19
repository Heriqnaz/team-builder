import axios from 'axios';
import {baseUrl} from "../../constants";

export function companiesHaveError(bool) {
    return {
        type: 'COMPANIES_HAVE_ERROR',
        companiesHasError: bool
    };
}

export function companiesAreLoading(bool) {
  return {
    type: 'COMPANIES_ARE_LOADING',
    companiesIsLoading: bool
  };
}


export function companiesFetchDataSuccess(companies) {
  return {
    type: 'COMPANIES_FETCH_DATA_SUCCESS',
    companies
  };
}

export function registerHaveError(bool) {
    return {
        type: 'REGISTER_HAVE_ERROR',
        registerHasError: bool
    };
}

export function registerAreLoading(bool) {
  return {
    type: 'REGISTER_ARE_LOADING',
    registerIsLoading: bool
  };
}
export function loginHaveError(bool) {
    return {
        type: 'LOGIN_HAVE_ERROR',
        loginHasError: bool
    };
}

export function userAreLoading(bool) {
    return {
        type: 'USER_ARE_LOADING',
        userIsLoading: bool
    };
}

export function loginAreLoading(bool) {
    return {
        type: 'LOGIN_ARE_LOADING',
        loginIsLoading: bool
    };
}

export function userFetchDataSuccess(user) {
    return {
        type: 'USER_FETCH_DATA_SUCCESS',
        user
    };
}
export function setUserToken(token) {
    return {
        type: 'SET_TOKEN_SUCCESS',
        token
    };
}

export function getCompaniesData() {
    return (dispatch) => {
        dispatch(companiesAreLoading(true));

        axios.get(`${baseUrl}companies`)
            .then((response) => {
                if (response.status !== 200) {
                    throw Error(response.statusText);
                }

                dispatch(companiesAreLoading(false));

                return response;
            })
            .then((response) => dispatch(companiesFetchDataSuccess(response.data)))
            .catch(() => dispatch(companiesHaveError(true)));
    };
}
export function register(data, historyPush) {
    return (dispatch) => {
      dispatch(registerAreLoading(true));

      axios.post(`${baseUrl}users/register`, data)
        .then((response) => {
          if (response.status !== 200) {
            throw Error(response.statusText);
          }
          dispatch(registerAreLoading(false))
          return response;
        })
        .then((response) => historyPush('/login'))
        .catch(() => dispatch(registerHaveError(true)))
    };
}
export function updateUserData(data) {
    return (dispatch) => {

      axios.put(`${baseUrl}users/update`, data, {headers: {token: localStorage.getItem('token')}})
        .then((response) => {
          if (response.status !== 200) {
            throw Error(response.statusText);
          }
          return response;
        })
        .then((response) => dispatch(getUser()))
        .catch(() => dispatch(registerHaveError(true)))
    };
}

export function login(data, historyPush) {
    return (dispatch) => {
      dispatch(loginAreLoading(true))
      axios.post(`${baseUrl}users/login`, data)
        .then((response) => {
          if (response.status !== 200) {
            throw Error(response.statusText);
          }
          dispatch(loginAreLoading(false))
          return response;
        })
        .then((response) => {
          console.log('response.data', response.data)
          localStorage.setItem('token', response.data.token);
          historyPush("/home");
          dispatch(setUserToken(response.data.token))
          dispatch(userFetchDataSuccess(response.data))
        })
        .catch(() => dispatch(loginHaveError(true)));
    };
}
export function getUser() {
    return (dispatch) => {
      dispatch(userAreLoading(true));
      axios.get(`${baseUrl}users`, {headers: {token: localStorage.getItem('token')}})
        .then((response) => {
          if (response.status !== 200) {
            throw Error(response.statusText);
          }
          dispatch(userAreLoading(false));
          return response;
        })
        .then((response) => {
          dispatch(setUserToken(localStorage.getItem('token')));
          dispatch(userFetchDataSuccess(response.data))
        })
        .catch(() => dispatch(loginHaveError(true)));
    };
}
export function logout(historyPush) {
    return (dispatch) => {
      axios.get(`${baseUrl}users/logout`, {headers: {token: localStorage.getItem('token')}})
        .then((response) => {
          if (response.status !== 200) {
            throw Error(response.statusText);
          }
          return response;
        })
        .then((response) => {
          localStorage.removeItem('token');
          dispatch(setUserToken(''));
          historyPush('/login');
          dispatch(userFetchDataSuccess({}));
        })
        .catch(() => dispatch(loginHaveError(true)));
    };
}