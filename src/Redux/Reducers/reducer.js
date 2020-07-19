export function companiesHaveError(state = false, action) {
    switch (action.type) {
        case 'COMPANIES_HAVE_ERROR':
            return action.companiesHasError;

        default:
            return state;
    }
}

export function companiesAreLoading(state = false, action) {
    switch (action.type) {
        case 'COMPANIES_ARE_LOADING':
            return action.companiesIsLoading;

        default:
            return state;
    }
}

export function companies(state = [], action) {
    switch (action.type) {
        case 'COMPANIES_FETCH_DATA_SUCCESS':
            return action.companies;

        default:
            return state;
    }
}
export function registerHaveError(state = false, action) {
    switch (action.type) {
        case 'REGISTER_HAVE_ERROR':
            return action.registerHasError;

        default:
            return state;
    }
}

export function registerAreLoading(state = false, action) {
    switch (action.type) {
        case 'REGISTER_ARE_LOADING':
            return action.registerIsLoading;

        default:
            return state;
    }
}
export function loginHaveError(state = false, action) {
    switch (action.type) {
        case 'LOGIN_HAVE_ERROR':
            return action.loginHasError;

        default:
            return state;
    }
}

export function loginAreLoading(state = false, action) {
    switch (action.type) {
        case 'LOGIN_ARE_LOADING':
            return action.loginIsLoading;

        default:
            return state;
    }
}
export function userAreLoading(state = false, action) {
    switch (action.type) {
        case 'USER_ARE_LOADING':
            return action.userIsLoading;

        default:
            return state;
    }
}

export function user(state = {}, action) {
    switch (action.type) {
        case 'USER_FETCH_DATA_SUCCESS':
            return action.user;

        default:
            return state;
    }
}

export function token(state = '', action) {
  switch (action.type) {
    case 'SET_TOKEN_SUCCESS':
      return action.token;

    default:
      return state;
  }
}
export function topics(state = '', action) {
  switch (action.type) {
    case 'TOPICS_FETCH_DATA_SUCCESS':
      return action.topics;

    default:
      return state;
  }
}
export function topicsHasError(state = '', action) {
  switch (action.type) {
    case 'TOPICS_HAVE_ERROR':
      return action.topicsHasError;

    default:
      return state;
  }
}
export function topicsIsLoading(state = '', action) {
  switch (action.type) {
    case 'TOPICS_ARE_LOADING':
      return action.topicsIsLoading;

    default:
      return state;
  }
}
export function projects(state = '', action) {
  switch (action.type) {
    case 'PROJECTS_FETCH_DATA_SUCCESS':
      return action.projects;

    default:
      return state;
  }
}
export function projectsHasError(state = '', action) {
  switch (action.type) {
    case 'PROJECTS_HAVE_ERROR':
      return action.projectsHasError;

    default:
      return state;
  }
}
export function projectsIsLoading(state = '', action) {
  switch (action.type) {
    case 'PROJECTS_ARE_LOADING':
      return action.projectsIsLoading;

    default:
      return state;
  }
}
export function teams(state = '', action) {
  switch (action.type) {
    case 'TEAMS_FETCH_DATA_SUCCESS':
      return action.teams;

    default:
      return state;
  }
}
export function teamsHasError(state = '', action) {
  switch (action.type) {
    case 'TEAMS_HAVE_ERROR':
      return action.teamsHasError;

    default:
      return state;
  }
}
export function teamsIsLoading(state = '', action) {
  switch (action.type) {
    case 'TEAMS_ARE_LOADING':
      return action.teamsIsLoading;

    default:
      return state;
  }
}