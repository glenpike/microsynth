import Immutable from 'immutable';
import { RESIZE_APP } from '../actions';

export const initialState = Immutable.fromJS({
  contentRect: {},
});

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESIZE_APP: {
      const { contentRect } = action;
      return state.set('contentRect', Immutable.fromJS(contentRect));
    }
    default:
      return state;
  }
};

export default appReducer;
