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
        description: action.description,
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

const popup = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_POPUP':
      return Object.assign(
        {},
        state,
        action
      );
    case 'REMOVE_POPUP':
    default:
      return {
        visible: false,
      };
  }
};

const courseToTake = (state = {}, action) => {
  switch (action.type) {
    case 'COURSES_TO_TAKE':
      return {
        instructor: action.instructor,
        courseId: action.course.split('-')[0].replace(/\s/, '').trim(),
      };
    default:
      return state;
  }
};

const coursesToTake = (state = [], action) => {
  switch (action.type) {
    case 'COURSES_TO_TAKE':
      return action.courses.map(c => {
        return courseToTake(undefined, {
          type: action.type,
          ...c
        });
      });
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  courses,
  distributions,
  popup,
  coursesToTake,
});

export default rootReducer;
