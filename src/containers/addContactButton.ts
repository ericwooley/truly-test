import { connect } from "react-redux";
import AddContactButton from "../components/addContactButton/addContactButton";
import { IState } from "../redux/store";
import actions from "../redux/actions";
import selectors from "../redux/selectors";
export default connect(
  (state: IState) => ({
    showPopover: selectors.ui.displayAddContactForm(state)
  }),      
  {
    onPress: actions.ui.displayAddContactForm
  })(AddContactButton);
