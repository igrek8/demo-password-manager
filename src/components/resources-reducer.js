import {
  ADD_RESOURCE,
  PUT_RESOURCE,
  DESTROY_RESOURCE,
} from './resources-actions';

const resourceReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_RESOURCE: {
      return [...state, action.payload];
    }
    case DESTROY_RESOURCE: {
      return state.filter((resource) => {
        return resource.id !== action.payload.id;
      });
    }
    case PUT_RESOURCE: {
      return state.map((resource) => {
        if (resource.id === action.payload.id) {
          return action.payload;
        }
        return resource;
      });
    }
    default: {
      return state;
    }
  }
};

export default resourceReducer;
