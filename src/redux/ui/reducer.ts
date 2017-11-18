import { handleActions, Action,
  // Action,
  // combineActions
  } from "redux-actions";
import { actions } from "./actions";
const initialState = {
  displayAddContactForm: false
};
export type UIState = typeof initialState;
const reducer = handleActions(
  {
    [actions.displayAddContactForm]: (state: UIState, action: Action<boolean>): UIState => ({
      ...state,
      displayAddContactForm: !!action.payload
    })
  },
  initialState
);

export default reducer;
