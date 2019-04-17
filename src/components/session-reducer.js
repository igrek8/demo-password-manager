import { INIT_SESSION, DESTROY_SESSION } from './session-reducer-actions';

const sessionReducer = (state, action) => {
  switch (action.type) {
    case INIT_SESSION: {
      return action.payload.newSession;
    }
    case DESTROY_SESSION: {
      return null;
    }
    default:
      return state;
  }
};

export default sessionReducer;
