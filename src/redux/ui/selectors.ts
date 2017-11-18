// import { createSelector } from "reselect";
import { UIState } from "./reducer";
interface IState {
  ui: UIState;
}
const displayAddContactForm = (state: IState) => state.ui.displayAddContactForm;
export default {
  displayAddContactForm
};
