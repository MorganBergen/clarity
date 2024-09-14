import { combineReducers } from 'redux';

// Example reducer
const exampleReducer = (state = {}, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  example: exampleReducer,
  // Add other reducers here
});

export default rootReducer;