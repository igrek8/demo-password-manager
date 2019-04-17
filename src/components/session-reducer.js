import { INIT_SESSION, DESTROY_SESSION } from './session-actions';
import { ADD_RESOURCE } from './resources-actions';

import resourcesReducer from './resources-reducer';

const initialState = null;

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_SESSION: {
      return action.payload;
    }
    case ADD_RESOURCE: {
      return {
        ...state,
        resources: resourcesReducer(state.resources, action),
      };
    }
    case DESTROY_SESSION: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};

export default sessionReducer;
