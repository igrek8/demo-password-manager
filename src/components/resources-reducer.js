import { ADD_RESOURCE } from './resources-actions';

const resourceReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_RESOURCE: {
      console.warn(action);
      return state;
    }
    default: {
      return state;
    }
  }
};

export default resourceReducer;
