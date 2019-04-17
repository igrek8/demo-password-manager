import {
  ADD_RESOURCE,
  PUT_RESOURCE,
  DESTROY_RESOURCE,
} from './resources-actions';
import { INIT_SESSION } from './session-actions';

import resourcesReducer from './resources-reducer';

const initialState = { resources: [] };

const sessionReducer = (state = null, action = {}) => {
  switch (action.type) {
    case INIT_SESSION: {
      return initialState;
    }
    case PUT_RESOURCE:
    case DESTROY_RESOURCE:
    case ADD_RESOURCE: {
      return {
        ...state,
        resources: resourcesReducer(state.resources, action),
      };
    }
    default: {
      return state;
    }
  }
};

export default sessionReducer;
