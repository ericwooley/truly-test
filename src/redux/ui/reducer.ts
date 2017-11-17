import { handleActions,
  // Action,
  // combineActions
  } from "redux-actions";
// import { actions } from "./actions";
const initialState = {
};
export type UIState = typeof initialState;
const reducer = handleActions(
  {
  },
  initialState
);

export default reducer;
