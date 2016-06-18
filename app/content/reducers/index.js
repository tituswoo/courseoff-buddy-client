import { combineReducers } from 'redux';

const course = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_COURSE':
      return {
        title: action.title,
        color: action.color,
        id: action.id,
      };
    default:
      return state;
  }
};

const courses = (state = [], action) => {
  switch (action.type) {
    case 'ADD_COURSE':
      return [
        ...state,
        course(undefined, action),
      ];
    default:
      return state;
  }
};

const distribution = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_DISTRIBUTION':
      return {
        id: action.id,
        a: action.a,
        b: action.b,
        c: action.c,
        d: action.d,
        f: action.f,
        gpa: action.gpa,
      };
    case 'ADD_DISTRIBUTION_ERROR':
      return {
        id: action.id,
        errorMessage: action.errorMessage,
      };
    default:
      return state;
  }
};

const distributions = (state = [], action) => {
  switch (action.type) {
    case 'ADD_DISTRIBUTION':
    case 'ADD_DISTRIBUTION_ERROR':
      return [
        ...state,
        distribution(undefined, action),
      ];
    default:
      return state;
  }
};

const popup = (state = { visible: false }, action) => {
  switch (action.type) {
    case 'UPDATE_POPUP':
      return Object.assign(
        {},
        state,
        action
      );
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  courses,
  distributions,
  popup,
});

export default rootReducer;
