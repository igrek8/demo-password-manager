import { ADD_RESOURCE } from './resources-actions';

const resourceReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_RESOURCE: {
      return [...state, action.payload];
    }
    default: {
      return state;
    }
  }
};

export default resourceReducer;
